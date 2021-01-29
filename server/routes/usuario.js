const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/', (req, res) => {
    res.json('Hola!');
})

router.post('/', (req, res) => {

    let { nombre, email, password, role, img } = req.body;

    let usuario = new Usuario({
        nombre,
        email,
        password,
        img, 
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

router.put('/users/:id', (req, res) => {

    const {id} = req.params;
    res.json({
        id,
        msg: 'Hola'
    });
})
router.delete('/users', (req, res) => {
    res.json('Hola!');
})

module.exports = router;