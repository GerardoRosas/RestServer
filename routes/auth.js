const router = require('express').Router();
const { check, body } = require('express-validator');

const { validate } = require('../middlewares/validation');

//Controllers 
const authController = require('../controllers/authController');

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty()
], validate, authController.login);

router.post('/google', [
    check('id_token', 'El id es necesario').notEmpty(),
], validate, authController.googleSignIn);



module.exports = router;