const mongoose = require('mongoose'); //requerimos libreria de mongo

const cultivosDataSchema = new mongoose.Schema( 
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        cultivosData: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        plagas: {
            type: String,
            required: true
        },
        vidaUtil: {
            type: Object,
            required: true
        },
        etapaFloracion: {
            type: Object,
            required: true
        },
        etapaFruto: {
            type: Object,
            required: true
        },
        riego: {
            type: Object,
            required: true
        },
        poda: {
            type: Object,
            required: true
        },
        fertilizacion: {
            type: Object,
            required: true
        },
        humedad: {
            type: Object,
            required: true
        },
        temperatura: {
            type: Object,
            required: true
        },
    },
    {
        versionKey: false //para evitar el __v al agregar datos
    }
)

module.exports = mongoose.model('cultivosData', cultivosDataSchema, 'cultivosData') //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection