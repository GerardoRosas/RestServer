const router = require('express').Router();
const { check } = require('express-validator');

const { validate } = require('../middlewares/validation');

const uploadsController = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

router.post('/', uploadsController.cargarArchivo)

router.put('/:coleccion/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validate
], uploadsController.actualizarImagen)



module.exports = router;