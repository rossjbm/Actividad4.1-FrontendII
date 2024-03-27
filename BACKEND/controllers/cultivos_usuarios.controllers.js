const cultivos_usuariosModels = require("../models/cultivos_usuarios.models");

class cultivos_usuariosControllers {
    async listar(req, res, next) { 
        try {
            
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({"error":error}) //estado
        }
    }
}

module.exports = new cultivos_usuariosControllers();