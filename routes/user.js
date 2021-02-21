const router = require('express').Router();
const { check, body } = require('express-validator')

const userController = require('../controllers/userController');

router.get('/', userController.usuariosGet)

router.put('/:id', userController.usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'Correo no es valido').isEmail(),
    body('role', 'El role es obligatorio').not().isEmpty()
], userController.usuariosPost);

router.delete('/', userController.usuariosDelete);

router.patch('/', userController.usuariosPatch);



module.exports = router;

