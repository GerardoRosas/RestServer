const { response } = require('express');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

module.exports.usuariosGet = (req, res = response) => {

    const { q, estatus, nombre = "No name", page = 1, limit } = req.query;

    res.send({
        msg: 'GET',
        q, 
        estatus,
        nombre,
        page,
        limit
    })
}

module.exports.usuariosPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario({ nombre, correo, password, role });

    //Verificar si el correo existe
    const emailExists = await Usuario.findOne({ correo });
    if(emailExists){
        return res.status(400).json({
            message: 'El usuario ya existe en base de datos'
        })
    }

    //Encriptar la contraseña
    const saltRounds = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, saltRounds );


    //Guardar enBD
    await usuario.save();

    res.json({
        msg: 'Post',
        usuario
    })
}

module.exports.usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.send({
        msg: 'Put',
        id
    })
}

module.exports.usuariosPatch = (req, res = response) => {

    res.send({
        msg: 'Patch'
    })
}

module.exports.usuariosDelete = (req, res = response) => {

    res.send({
        msg: 'Delete'
    })
}

