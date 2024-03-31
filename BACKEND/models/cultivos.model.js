const mongoose = require('mongoose'); //requerimos libreria de mongo

const cultivosSchema = new mongoose.Schema( 
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        tiempo_crecimiento: {
            type: String,
            required: true
        },
        cantidad_riego: {
            type: String,
            required: true
        },
        dias_poda: {
            type: String,
            required: true
        },
        plagas: {
            type: Array,
            required: true
        },
        dias_fertilizacion: {
            type: String,
            required: true
        },
        cantidad_agua_minima: {
            type: String,
            required: true
        },
        dia_floracion: {
            type: String,
            required: true
        },
        humedad_ideal: {
            type: String,
            required: true
        },
        temperatura_ideal: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false //para evitar el __v al agregar datos
    }
)

module.exports = mongoose.model('cultivos', cultivosSchema, 'cultivos') //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection