const express = require('express');
const router = express.Router();
const cultivosController = require('../controllers/cultivosData.controllers')

router.get('/' , cultivosController.listar);
router.get('/:id' , cultivosController.listarUna);
router.get('/nombre/:nombre' , cultivosController.listarCultivo);
router.post('/' , cultivosController.agregar);
router.delete('/:id' , cultivosController.eliminar);

module.exports = router;