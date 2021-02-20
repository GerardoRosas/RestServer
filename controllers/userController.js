const { response } = require('express');
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

module.exports.usuariosPost = (req, res = response) => {

    const { nombre, correo } = req.body;

    const usuario = new Usuario(req.body);

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

