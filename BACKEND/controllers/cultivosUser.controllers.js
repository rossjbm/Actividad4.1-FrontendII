const cultivosUser = require("../models/cultivosUser.model");
const cultivosData = require("../models/cultivosData.model");

class cultivos_usuariosControllers {
    async listar(req, res, next) {
        try {
            const data = await cultivosUser.find();
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
            const data = await cultivosUser.find({usuarioId: id});
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
            const data = await cultivosUser.findById(id);
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
            const cultivo = await cultivosUser.create(data);
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
            const data = await cultivosUser.findById(id);
            if (!data) {
                return res.status('404').json({ error: "No existe el cultivo" })
            }
            const eliminado = await cultivosUser.findByIdAndDelete(id)
            if (eliminado) {
                return res.status('200').json({cultivo_eliminado: eliminado, mensaje: "Hemos eliminado el cultivo"})
            }
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    //Agregar Pesticida
    async agregarPesticida(req, res, next) {
        try {
            const { para, contagio, cultivo, nombre} = req.body;  //cultivo = Tomate  ;  nombre = Lote 3 Tomates
            console.log(para, cultivo)

            var datosPlaga ;
            var diaInicio ;
            var pesticidaTarea = [];
            var hechos = [];
            var cantidad;

            try {
                const datos = await cultivosData.find({nombre: cultivo})
                // console.log(datos)
                const datosCultivo = datos[0]

                //hallamos la información del determinado tipo de plaga
                for (let i=0; i < datosCultivo.plagas.length ; i++) {
                    // console.log('soy', datosCultivo.plagas[i].tipo)
                    if(datosCultivo.plagas[i].tipo === para) {
                        datosPlaga = datosCultivo.plagas[i]
                    }
                }
                // console.log("plaga",datosPlaga.pesticida)
            } catch (error) {
                res.status('404').json({ "error": "No se pudo acceder a los datos del cultivo" })
            }

            try {
                console.log('estamos en cultivos de usuario')
                const datosCultivosUser = await cultivosUser.find({nombre: nombre})
                // console.log(datosCultivosUser[0])

                const fecha1 = new Date(datosCultivosUser[0].plantacion)
                const fecha2 = new Date(contagio)

                for (let i=0; fecha1<=fecha2; i++){
                    fecha1.setDate(fecha1.getDate() + 1);
                    diaInicio = i
                }
                // console.log('dia de inicio de pesticida', diaInicio)
            } catch (error) {
                res.status('404').json({ "error": "No se pudo acceder a los datos del cultivo del usuario" })
            }

            //guardar cantidad
            console.log(datosPlaga.cantidad)

            //guardar días de echar fertilizante
            var cont = 0
            for (let i=diaInicio; cont < datosPlaga.durante; i++) {
                if(i % datosPlaga.frecuencia === 0) {
                    pesticidaTarea =  [...pesticidaTarea, i];
                    cont++
                }
            }

            // console.log(pesticidaTarea)

            //guardar unchecks de fertilizante
            for (let i=0; i<pesticidaTarea.length ; i++) {
                hechos =  [...hechos, 0];
            }

            // console.log(hechos)

            const resultado = await cultivosUser.updateOne({nombre: nombre}, {$set:{fumigar: {dias: pesticidaTarea, hechos: hechos, cantidad: datosPlaga.cantidad, medida: datosPlaga.medida}}})

            console.log(resultado)
            return res.status('200').json({ "mensaje": `Se ha registrado correctamente la plaga. A partir de mañana inicia su tratamiento con ${datosPlaga.pesticida}` })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }
}

module.exports = new cultivos_usuariosControllers();