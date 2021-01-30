const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

const bcrypt = require('bcrypt');
const _ = require('underscore');

router.get('/', (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                usuarios
            });
        })

})

router.post('/', (req, res) => {

    let { nombre, email, password, role, img } = req.body;

    let usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        img, 
        role
    })

    usuario.save((err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })
    
})

router.put('/:id', (req, res) => {

    const {id} = req.params;
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    })

    
})

router.delete('/users', (req, res) => {
    res.json('Hola!');
})

module.exports = router;