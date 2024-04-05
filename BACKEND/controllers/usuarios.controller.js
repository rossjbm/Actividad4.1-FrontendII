const usuariosModels = require("../models/usuarios.model");

class usuariosControllers {
    async listarUna(req, res, next) {
        try {
            const id = req.params.id
            const data = await usuariosModels.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el usuario" })
            }
            return res.status('200').json({ok: true, mensaje: "Se ha conseguido el usuarios" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }
}

module.exports = new usuariosControllers();