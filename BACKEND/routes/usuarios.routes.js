const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller')

router.get('/' , usuariosController.listarUna);
router.get('/haber/:id' , usuariosController.listarPorId);
router.post('/login', usuariosController.iniciarSesion)
router.get('/verificar', usuariosController.verificacion)

module.exports = router;