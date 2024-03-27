const express = require('express');
const router = express.Router();
const cultivosController = require('../controllers/cultivos.controllers')

router.get('/' , cultivosController.listar);

module.exports = router;