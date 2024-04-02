const cultivos_usuariosModels = require("../models/cultivos.models");

class cultivos_usuariosControllers {
    async listar(req, res, next) {
        try {
            const data = await cultivos_usuariosModels.find();
            if (data.length === 0) {
                return res.status('200').json({ mensaje: "No hay cultivos registrados" })
            }
            return res.status('200').json({ cultivos_usuarios: data, mensaje: "Listado con Exito cultivos_usuarios" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async listarDeUsuarios(req, res, next) {
        try {
            const id = req.params.id
            console.log(id)
            const data = await cultivos_usuariosModels.find({usuarioId: id});
            console.log(data)
            if (data.length === 0) {
                return res.status('200').json({ mensaje: "No hay cultivos registrados" })
            }
            return res.status('200').json({ cultivos: data, mensaje: "Listado con Exito cultivos_usuarios" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async listarUna(req, res, next) {
        try {
            const id = req.params.id
            const data = await cultivos_usuariosModels.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el cultivo" })
            }
            return res.status('200').json({ cultivos_usuario: data, mensaje: "Se ha consegui el cultivo" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async agregar(req, res, next) {
        try {
            const { nombre, plantacion, superficie, numeroCultivos, fertilizante, usuarioId} = req.body;
            if (numeroCultivos < 0) {
                res.status('404').json({ "error": "Los cultivos deben ser minimo 1" })
            }
            if (superficie < 0) {
                res.status('404').json({ "error": "La superficie deben ser minimo 1" })
            }
            const data = {
                nombre, plantacion, superficie, numeroCultivos, fertilizante, usuarioId
            }
            const cultivo = await cultivos_usuariosModels.create(data);
            if (cultivo) {
                return res.status('201').json({cultivoCreado: cultivo, mensaje: "Agregado el Cultivo"})
            }
            return res.status('404').json({ "error": "No se agrego el cultivo" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async eliminar(req, res, next) {
        try {
            const id = req.params.id
            const data = await cultivos_usuariosModels.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el cultivo" })
            }
            const eliminado = await cultivos_usuariosModels.findByIdAndDelete(id)
            if (eliminado) {
                return res.status('200').json({cultivo_eliminado: eliminado, mensaje: "Hemos eliminado el cultivo"})
            }
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }
}

module.exports = new cultivos_usuariosControllers();