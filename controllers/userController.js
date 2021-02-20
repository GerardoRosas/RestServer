const { response } = require('express')

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

    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post',
        nombre, 
        edad
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

