const jwt = require('jsonwebtoken');

// =============
//Verificar token
// =============
let verificarToken = (req, res, next) => {

    //Con el metodo get accedemos a los headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    msg: 'Token no válido'
                }
            })
        }

        //Extraemos el payload de jwt y lo asignamos
        req.usuario = decoded.usuario;
        next()

    })

};

// Verifica admin role
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next()
        
    } else {
        return res.json({
            ok: false,
            err: {
                msg: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = {
    verificarToken,
    verificaAdmin_Role,
};