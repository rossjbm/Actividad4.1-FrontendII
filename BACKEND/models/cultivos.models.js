const mongoose = require('mongoose'); //requerimos libreria de mongo

const cultivosSchema = new mongoose.Schema( 
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        usuarioId: mongoose.Schema.ObjectId,
        superficie: {
            type: Number,
            required: true
        },
        numeroCultivos: {
            type: Number,
            required: true
        },
        plantacion: {
            type: String,
            required: true
        },
        fertilizante: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false //para evitar el __v al agregar datos
    }
)

module.exports = mongoose.model('cultivos', cultivosSchema, 'cultivos') //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection