const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post('/', (req, res) => {

    const { email, password } = req.body;

    Usuario.findOne({email}, (err, usuarioDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    msg: '(Usuario) o contraseña incorrectos'
                }
            })
        }

        if( !bcrypt.compareSync(password, usuarioDB.password) ) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario (o contraseña) incorrectos'
                }
            })
        }

        let token = jwt.sign({
            //Definimos el payloadque lleva por nombre usuario
            usuario: usuarioDB
        }, process.env.SEED , { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    })
});


//Configuraciones de Google
async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    console.log(payload.name);
    console.log(payload.email);
}

router.post('/google', (req, res) => {

    let { idtoken } = req.body;

    verify(idtoken)

    res.json({
        idtoken
    })
})

module.exports = router;