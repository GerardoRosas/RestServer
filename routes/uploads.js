const router = require('express').Router();
const { check } = require('express-validator');

const { validate } = require('../middlewares/validation');
const { validarArchivo } = require('../middlewares/validar-archivo');

const uploadsController = require('../controllers/uploads'); 
const { coleccionesPermitidas } = require('../helpers/db-validators');

router.post('/', validarArchivo, uploadsController.cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id no es válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validate
], uploadsController.actualizarImagen)

router.get('/:coleccion/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validate
], uploadsController.mostrarImagen)



module.exports = router;