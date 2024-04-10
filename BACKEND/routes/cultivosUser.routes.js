const express = require('express');
const router = express.Router();
const cultivosUserController = require('../controllers/cultivosUser.controllers')

router.get('/' , cultivosUserController.listar);
router.get('/una/:id' , cultivosUserController.listarUna);
router.get('/:id' , cultivosUserController.listarDeUsuarios);
router.post('/' , cultivosUserController.agregar);
router.delete('/:id' , cultivosUserController.eliminar);
router.put('/pesticida' , cultivosUserController.agregarPesticida);
router.put('/tareaEstado' , cultivosUserController.actualizarTarea);

module.exports = router;