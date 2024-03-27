const express = require('express');
const router = express.Router();
const cultivos_usuariosController = require('../controllers/cultivos_usuarios.controllers')

router.get('/' , cultivos_usuariosController.listar);

module.exports = router;