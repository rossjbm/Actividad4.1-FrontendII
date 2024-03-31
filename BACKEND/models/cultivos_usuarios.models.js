const mongoose = require('mongoose'); //requerimos libreria de mongo

const cultivosUsuariosSchema = new mongoose.Schema( 
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        superficie: {
            type: Number,
            required: true
        },
        numero_cultivos: {
            type: Number,
            required: true
        },
        dia_plantacion: {
            type: String,
            required: true
        },
        fertilizante: {
            type: String,
            required: true
        },
        tipo_fertilizante: {
            type: String,
            required: true
        },
        cientifico: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false //para evitar el __v al agregar datos
    }
)

module.exports = mongoose.model('cultivos_usuarios', cultivosUsuariosSchema, 'cultivos_usuarios') //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection