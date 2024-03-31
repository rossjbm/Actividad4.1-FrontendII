const express = require('express');
const router = express.Router();
const cultivosController = require('../controllers/cultivos.controllers')

router.get('/' , cultivosController.listar);
router.get('/:id' , cultivosController.listarUna);
router.post('/' , cultivosController.agregar);
router.delete('/:id' , cultivosController.eliminar);

module.exports = router;