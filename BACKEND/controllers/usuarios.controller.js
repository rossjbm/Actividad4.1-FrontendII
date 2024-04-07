const usuariosModels = require("../models/usuarios.model");
const autenticacionPorHeader = require("./jwt/autenticacion");
const crearToken = require("./jwt/crear");

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

    async iniciarSesion(req, res, next) {
        try {
            const { usuario, password } = req.body;
            const usuariodb = await usuariosModels.findOne({usuarioUnico: usuario});

            if (!usuariodb) {
                return res.status('404').json({ "error": "No existe el usuario" }) //estado
            }

            if (usuariodb.contrasena != password) {
                return res.status('404').json({ "error": "La contrasenia esta errada" }) //estado
            }
            let token = crearToken({
                id: usuariodb._id,
                usuario: usuariodb.usuarioUnico
            });
            return res.status('200').json({token: token})
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async verificacion(req, res, next) {
        try {
            const acceso = await autenticacionPorHeader(req, res, next);
            res.status('200').json({"usuarioId": acceso.id})
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }
    
}

module.exports = new usuariosControllers();