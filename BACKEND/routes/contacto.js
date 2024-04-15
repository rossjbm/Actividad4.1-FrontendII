var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')


router.post('/', async function(req, res, next) {

  const datos = req.body
  console.log(datos)

  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'hazbinhotelreservaciones@gmail.com',
      pass: 'sjch bged gzcg sicf'
    },
    tls: {
        rejectUnauthorized: false,
    }
  }

  const mensaje = {
    from: 'hazbinhotelreservaciones@gmail.com',
    to: datos.correo,
    subject: 'Contactaste a RigoPlant',
    text: '¡Hola Querido Usuario! Bienvenido a RigoPlant \n\n Nuestra aplicación es la mejor opción para el riego eficiente de tus cultivos, diseñada para ayudarte a maximizar la productividad de tus plantas.'
  }

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje)

  console.log(info)
  res.status(200).json({ info: info, status: 200})
});

module.exports = router;
