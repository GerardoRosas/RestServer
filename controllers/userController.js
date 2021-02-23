const { response } = require('express');
const bcrypt = require('bcrypt');
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

    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario({ nombre, correo, password, role });

    //Encriptar la contraseña
    const saltRounds = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, saltRounds );


    //Guardar enBD
    await usuario.save();

    res.json({
        usuario
    })
}

module.exports.usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...info } = req.body;

    if(password){
        //Encriptar la contraseña
        const saltRounds = bcrypt.genSaltSync();
        info.password = bcrypt.hashSync( password, saltRounds );
    }

    const updatedUser = await Usuario.findByIdAndUpdate( id, info, { new: true});


    res.send({
        msg: 'Usuario Actualizado',
        updatedUser
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

