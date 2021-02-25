const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/generateJWT');


module.exports.login = async (req, res) => {

    const { correo, password } = req.body;

    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }


        //Si el usaurio esta activo en la BD
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado : false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Usuario Autenticado',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.statsu(500).json({
            msg: 'Algo salió mal'
        })
    }

    res.send({
        msg: 'Hola'
    })
}