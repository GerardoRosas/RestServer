const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');


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

module.exports.googleSignIn = async (req, res) => {

    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);
        //const { nombre, img , correo }
        console.log(googleUser);
        
        let usuario = await Usuario.findOne({correo:googleUser.correo});

        if(!usuario){
            const data = {
                nombre: googleUser.nombre,
                correo: googleUser.correo,
                password: ":D",
                img: googleUser.img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save()
            
        }

        //SI el usuario esta en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token   
        })
    } catch (error) {
        res.status(404).send({
            msg: 'Token de Google no reconocido'
        })
    }


    
}