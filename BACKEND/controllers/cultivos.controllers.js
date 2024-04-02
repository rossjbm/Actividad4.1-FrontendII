const cultivosModels = require("../models/cultivosData.model");

class cultivosControllers {
    async listar(req, res, next) { 
        try {
            const data = await cultivosModels.find();
            if (data.length === 0) {
                return res.status('200').json({ mensaje: "No hay cultivos registrados" })
            }
            return res.status('200').json({ cultivosData: data, mensaje: "Listado con Exito cultivos" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({"error":error}) //estado
        }
    }

    async listarUna(req, res, next) {
        try {
            const id = req.params.id
            const data = await cultivosModels.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el cultivo" })
            }
            return res.status('200').json({ cultivos_usuario: data, mensaje: "Se ha conseguido el cultivo" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    async agregar(req, res, next) {
        try {
            const { nombre, tiempo_crecimiento, cantidad_riego, dias_poda, plagas, dias_fertilizacion, cantidad_agua_minima, dia_floracion, humedad_ideal, temperatura_ideal } = req.body;
            const data = {
                nombre, tiempo_crecimiento, cantidad_riego, dias_poda, plagas, dias_fertilizacion, cantidad_agua_minima, dia_floracion, humedad_ideal, temperatura_ideal
            }
            const cultivo = await cultivosModels.create(data);
            if (cultivo) {
                return res.status('201').json({cultivo: cultivo, mensaje: "Agregado el Cultivo"})
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
            const data = await cultivosModels.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el cultivo" })
            }
            const eliminado = await cultivosModels.findByIdAndDelete(id)
            if (eliminado) {
                return res.status('200').json({cultivo_eliminado: eliminado, mensaje: "Hemos eliminado el cultivo"})
            }
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }
}

module.exports = new cultivosControllers();