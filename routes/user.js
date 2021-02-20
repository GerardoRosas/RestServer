const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.usuariosGet)

router.put('/:id', userController.usuariosPut);

router.post('/', userController.usuariosPost);

router.delete('/', userController.usuariosDelete);

router.patch('/', userController.usuariosPatch);



module.exports = router;

