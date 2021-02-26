const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

module.exports.usuariosGet = async (req, res = response) => {

    const { desde = 0, limite = 5 } = req.query;
    const query = { estado : true }
   
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde - 1))
            .limit(Number(limite))
    ])  

    res.json({
        total,
        usuarios
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

    res.json(usuario);
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

module.exports.usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //Cambiamos el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true});
    const usuarioAutenticado = req.usuario;

    res.json({
        message: 'Usuario borrado correctamente',
        usuarioBorrado: usuario,
        usuarioAutenticado
        
    })
}

