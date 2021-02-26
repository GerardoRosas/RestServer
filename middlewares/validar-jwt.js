const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const userToken = req.header('token');

    if(!userToken){
        return res.status(401).json({
            msg: 'No existe token de autenticación'
        })
    }

    try {
        
        const { uid } = jwt.verify(userToken, process.env.SECRETKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario) return res.status(401).json({msg: 'Usuario no existe en base de datos'});

        //Verificar si el user no esta borrado
        if(!usuario.estado) return res.status(401).json({msg: 'Token no válido'})
        
        req.usuario = usuario;

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = { validarJWT }