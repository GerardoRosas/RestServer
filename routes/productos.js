const router = require('express').Router();
const { check, body } = require('express-validator');

const { validate } = require('../middlewares/validation');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeProductoPorId, existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const productoController = require('../controllers/productoController');

//Obtener todas las categorias -- Publico
router.get('/', productoController.obtenerProductos);

//Obtener una categoria por id 
router.get('/:id', [
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validate,
], productoController.obtenerProducto)

//Crear categoria - privado 
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validate
], productoController.crearProducto)

//Actualizar un registro por id
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
], validate, productoController.actualizarProducto)

//Borrar categoria -- usuario ADmin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
], validate, productoController.borrarProducto)




module.exports = router;