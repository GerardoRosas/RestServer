const router = require('express').Router();
const { check, body } = require('express-validator');

const { validate } = require('../middlewares/validation');
const { esRoleValido, emailExists, existeUsuarioPorId } = require('../helpers/db-validators');
const userController = require('../controllers/userController');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', userController.usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('correo', 'Correo no es valido').isEmail().not().isEmpty(),  
    check('correo', 'El correo es obligatorio').custom( emailExists ).not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({min: 6}),
    //body('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValido )
], validate, userController.usuariosPost);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    body('role').custom( esRoleValido ),
], validate, userController.usuariosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
], validate, userController.usuariosDelete);

router.patch('/', userController.usuariosPatch);



module.exports = router;

