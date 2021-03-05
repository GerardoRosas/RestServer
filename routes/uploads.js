const router = require('express').Router();
const { check, body } = require('express-validator');

const { validate } = require('../middlewares/validation');

const uploadsController = require('../controllers/uploads');

router.post('/', [

], uploadsController.cargarArchivo)



module.exports = router;