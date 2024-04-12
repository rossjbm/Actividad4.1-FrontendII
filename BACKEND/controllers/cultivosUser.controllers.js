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
            console.log(typeof(id))
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
            const { nombre, cultivo, plantacion, superficie, numeroCultivos, fertilizante, usuarioId} = req.body;
            if (numeroCultivos < 0) {
                res.status('404').json({ "error": "Los cultivos deben ser minimo 1" })
            }
            if (superficie < 0) {
                res.status('404').json({ "error": "La superficie deben ser minimo 1" })
            }

            var regar;
            var podar;
            var fertilizar;
            var infoCultivo;

            try {
                const data = await cultivosData.find({nombre: cultivo})
                infoCultivo = data[0]
                console.log(infoCultivo)
            } catch (error) {
                res.status('404').json({ "error": "Error al obtener la información del Cultivo" })
            }

            var fin = infoCultivo.vidaUtil.muerte

            //agregar tareas de riego
            function agregarRiego() {
                var dias = []
                var hecho = []
                for ( let dia=0; dia < fin; dia++) {
                    if (dia % infoCultivo.riego.frecuencia === 0 || infoCultivo.riego.frecuencia === 0) {
                        dias = [...dias, dia]
                    }
                }
                for (let i=0; i<dias.length; i++) {
                    hecho = [...hecho, 0]
                }
                var tareas = {dias: dias, hecho: hecho}
                return tareas
            }

            //agregar tareas de poda
            function agregarPoda() {
                var dias = []
                var hecho = []
                if (infoCultivo.poda.mensaje === "Necesario") {
                    for ( let dia=infoCultivo.poda.inicio; dia < fin; dia++) {
                        if (dia % infoCultivo.poda.frecuencia === 0 || infoCultivo.poda.frecuencia === 0) {
                            dias = [...dias, dia]
                        }
                    }
                    for (let i=0; i<dias.length; i++) {
                        hecho = [...hecho, 0]
                    }
                    var tareas = {dias: dias, hecho: hecho}
                    return tareas
                } else {
                    return false
                }

            }

            //agregar tareas de fertilizante
            function agregarFertilizante() {
                var dias = []
                var hecho = []
                if (fertilizante === 'Si') {
                    for ( let dia=0; dia < fin; dia++) {
                        if (dia % infoCultivo.fertilizacion.frecuencia === 0 || infoCultivo.fertilizacion.frecuencia === 0) {
                            dias = [...dias, dia]
                        }
                    }
                    for (let i=0; i<dias.length; i++) {
                        hecho = [...hecho, 0]
                    }
                    var tareas = {dias: dias, hecho: hecho}
                    return tareas
                } else {
                    return false
                }
            }

            regar = agregarRiego()
            console.log('soy regar',regar)

            podar = agregarPoda()
            console.log('soy podar',podar)

            fertilizar = agregarFertilizante()
            console.log('soy fertilizar', fertilizar)

            const data = {
                nombre, cultivo, plantacion, superficie, numeroCultivos, fertilizante, usuarioId, regar, podar, fertilizar
            }

            console.log(data)
            const creado = await cultivosUser.create(data);
            if (creado) {
                return res.status('201').json({cultivoCreado: creado, mensaje: "Agregado el Cultivo"})
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
            const { para, id} = req.body; //para = plaga; id = id del cultivo del usuario

            console.log(id)

            var datosPlaga ;  //guardar los datos de la plaga determinada
            var datosCultivo ;  //guardar la data del cultivo
            var datosCultivosUser ;  //guardar info del cultivo del usuario al que le cayó la plaga
            var diaInicio ;  //numero de dia que cayó la plaga en base al día de vida del cultivo
            var pesticidaTarea = [];  //días donde hay que hechar pesticida
            var hechos = [];  //checks de las tareas

            try {
                datosCultivosUser = await cultivosUser.findById(id)
                const fecha1 = new Date(datosCultivosUser.plantacion)
                const fecha2 = new Date()

                console.log(fecha2)

                for (let i=0; fecha1<=fecha2; i++){
                    fecha1.setDate(fecha1.getDate() + 1);
                    diaInicio = i
                }
            } catch (error) {
                res.status('404').json({ "error": "No se pudo acceder a los datos del cultivo del usuario" })
            }

            try {
                const datos = await cultivosData.find({nombre: datosCultivosUser.cultivo})
                datosCultivo = datos[0]

                //hallamos la información del determinado tipo de plaga
                for (let i=0; i < datosCultivo.plagas.length ; i++) {
                    if(datosCultivo.plagas[i].tipo === para) {
                        datosPlaga = datosCultivo.plagas[i]
                    }
                }
            } catch (error) {
                res.status('404').json({ "error": "No se pudo acceder a los datos del cultivo" })
            }

            console.log(datosCultivo.vidaUtil.muerte)

            //guardar días de echar fertilizante
            var cont = 0
            for (let i=diaInicio; cont < datosPlaga.durante && i < datosCultivo.vidaUtil.muerte; i++) {
                if(i % datosPlaga.frecuencia === 0) {
                    pesticidaTarea =  [...pesticidaTarea, i];
                    cont++
                }
            }

            //guardar unchecks de fertilizante
            for (let i=0; i<pesticidaTarea.length ; i++) {
                hechos =  [...hechos, 0];
            }

            const resultado = await cultivosUser.findByIdAndUpdate(id, {$set:{fumigar: {dias: pesticidaTarea, hechos: hechos, cantidad: datosPlaga.cantidad, medida: datosPlaga.medida, pesticida: datosPlaga.pesticida}}})

            console.log(resultado)
            return res.status('200').json({ "mensaje": `Se ha registrado correctamente la plaga. A partir de mañana inicia su tratamiento con ${datosPlaga.pesticida}` })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status('404').json({ "error": error }) //estado
        }
    }

    //actualizar estado de tarea
    async actualizarTarea(req, res, next) {
        const { posicion, id, tarea, cambio} = req.body; //posicion = del array; id = id del cultivo del usuario; tipo de tarea para saber titulo
        console.log(posicion, id, tarea, cambio)

        try {
            const resultado = await cultivosUser.updateOne({_id: id}, { $set: { [`${tarea}.hecho.${posicion}`]: cambio } })

            return res.status('200').json({ "resultado": resultado ,"mensaje": `Se ha actualizado el estado` })
        } catch (error) {
            return res.status('404').json({ "error": error ,"mensaje": `No se ha actualizado el estado` })
        }

    }

}

module.exports = new cultivos_usuariosControllers();