const usuariosModels = require("../models/usuarios.model");
const autenticacionPorHeader = require("./jwt/autenticacion");
const crearToken = require("./jwt/crear");
const bcryptjs = require("bcryptjs")


class usuariosControllers {
    async listarUna(req, res, next) {
        try {
            const id = req.params.id
            const data = await usuariosModels.findById(id);
            if (!data) {
                return res.status(404).json({ error: "No existe el usuario" })
            }
            return res.status(200).json({ok: true, respuesta: data, mensaje: "Se ha conseguido el usuarios" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status(404).json({ "error": error }) //estado
        }
    }

    async listarPorId(req, res, next) {
        try {
            const id = req.params.id
            const data = await usuariosModels.findById(id);
            if (!data) {
                return res.status(404).json({ error: "No existe el usuario" })
            }
            return res.status(200).json({ respuesta: data, mensaje: "Se ha conseguido el usuarios" })
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status(404).json({ "error": error }) //estado
        }
    }

    async iniciarSesion(req, res, next) {
        try {
            const { usuario, password } = req.body;
            const usuariodb = await usuariosModels.findOne({usuarioUnico: usuario});

            if (!usuariodb) {
                return res.status(404).json({ "error": "No existe el usuario" }) //estado
            }

            // bcrypt  DESCOMENTAR si se usa el nuevo registrado
            const verificarPassword = await bcryptjs.compare(password, usuariodb.contrasena)
            if (!verificarPassword) {
                console.log('error en veri: ', verificarPassword);
                return res.status(404).json({ "error": "La contrasenia esta errada" }) //estado
            }

            // // DESCOMENTAR si se usa un usuario de los viejos
            // if (usuariodb.contrasena != password) {
            //     return res.status(404).json({ "error": "La contrasenia esta errada" }) //estado
            // }


            let token = crearToken({
                id: usuariodb._id,
                usuario: usuariodb.usuarioUnico
            });
            return res.status(200).json({token: token})
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status(404).json({ "error": error }) //estado
        }
    }

    async verificacion(req, res, next) {
        try {
            const acceso = await autenticacionPorHeader(req, res, next);
            res.status(200).json({"usuarioId": acceso.id})
        } catch (error) {
            console.log('Hubo algún error', error); // vemos error por consola
            res.status(404).json({ "error": error }) //estado
        }
    }

    async registro(req, res, next) {
        var {nombreCompleto, usuarioUnico, correoElectronico, contrasena, confirmarContrasena, latitud, longitud} = req.body

        try {
            if (!nombreCompleto || !usuarioUnico || !correoElectronico || !contrasena || !confirmarContrasena || !latitud || !longitud) {
                res.status(404).json({ "error": 'Debes ingresar todos los Datos reuqeridos' })
            }
            try {
                const db = await usuariosModels.find({'correoElectronico':correoElectronico});
                if (db.length != 0) {
                    res.status(404).json({ "error": 'Ese correo ya esta en uso' })
                }
            } catch (error) {
                console.log('Hubo algún error', error); // vemos error por consola
                res.status(404).json({ "error": error }) //estado
            }
    
            console.log("contraseña:", contrasena)
            var contrasenaNueva = await bcryptjs.hash(contrasena, 8);
            contrasena = contrasenaNueva
            console.log("contraseña:", contrasena)


            const correo = correoElectronico

            const documento = {nombreCompleto, usuarioUnico, correo, contrasena, latitud, longitud}
            await usuariosModels.create(documento);
            console.log(documento)
            res.status('200').json({"exito":"Se ha registrado correctamente"})

        } catch(error) {
            res.status('404').json({"error":"No se Pudo Registrar"})
        }


    }
    
}

module.exports = new usuariosControllers();


