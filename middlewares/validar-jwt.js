const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const userToken = req.header('token');

    if(!userToken){
        return res.status(401).json({
            msg: 'No existe token de autenticación'
        })
    }

    try {
        
        const { uid } = jwt.verify(userToken, process.env.SECRETKEY);

        req.uid = uid;

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = { validarJWT }