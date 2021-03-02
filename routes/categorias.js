const router = require('express').Router();
const { check, body } = require('express-validator');

const { validate } = require('../middlewares/validation');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

//Controllers 
const categoriaController = require('../controllers/categoriasController');

//Obtener todas las categorias -- Publico
router.get('/', categoriaController.obtenerCategorias);

//Obtener una categoria por id 
router.get('/:id', [
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    validate,
], categoriaController.obtenerCategoria)

//Crear categoria - privado 
router.post('/', [ 
    validarJWT,
    body('nombre', 'El nombre es olbligatorio').notEmpty(),

], categoriaController.crearCategoria)

//Actualizar un registro por id
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeCategoria ),
], validate, categoriaController.actualizarCategoria)

//Borrar categoria -- usuario ADmin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeCategoria ),
], validate, categoriaController.borrarCategoria)



module.exports = router;