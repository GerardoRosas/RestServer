const router = require('express').Router();

const buscarController = require('../controllers/buscarController');

router.get('/:coleccion/:termino', buscarController.buscar);


module.exports= router;