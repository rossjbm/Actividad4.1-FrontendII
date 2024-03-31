const mongoose = require('mongoose'); //requerimos libreria de mongo

const cultivosSchema = new mongoose.Schema( 
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        tiempo_crecimiento: {
            type: String,
            required: true
        },
        dias_riego: {
            type: Array,
            required: true
        },
        dias_abono: {
            type: Array,
            required: true
        },
        plagas: {
            type: Array,
            required: true
        },
        cantidad_cultivo: {
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
        }
    },
    {
        versionKey: false //para evitar el __v al agregar datos
    }
)

module.exports = mongoose.model('cultivos', cultivosSchema, 'cultivos') //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection