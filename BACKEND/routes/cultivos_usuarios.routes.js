const express = require('express');
const router = express.Router();
const cultivos_usuariosController = require('../controllers/cultivos_usuarios.controllers')

router.get('/' , cultivos_usuariosController.listar);
router.get('/:id' , cultivos_usuariosController.listarUna);
router.post('/' , cultivos_usuariosController.agregar);
router.delete('/:id' , cultivos_usuariosController.eliminar);

module.exports = router;