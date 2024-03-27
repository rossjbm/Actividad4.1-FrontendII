const cultivosModels = require("../models/cultivos.model");

class cultivosControllers {
    async listar(req, res, next) { 
        try {
            
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({"error":error}) //estado
        }
    }
}

module.exports = new cultivosControllers();