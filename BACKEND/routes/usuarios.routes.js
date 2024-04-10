const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller')

router.get('/:id' , usuariosController.listarUna);
router.post('/login', usuariosController.iniciarSesion)
router.get('/verificar', usuariosController.verificacion)

module.exports = router;