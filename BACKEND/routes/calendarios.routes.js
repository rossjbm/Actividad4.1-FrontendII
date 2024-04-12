const express = require('express');
const router = express.Router();
const {porcultivo} = require('../controllers/calendarios.controllers')

router.get('/id/:idUsuario/cultivo/:idCultivo', porcultivo);


module.exports = router;