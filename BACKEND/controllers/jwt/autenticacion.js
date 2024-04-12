const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try{
        return jwt.verify(token, process.env.SECRET)
    }catch(e){
        return null
    }
}

async function autenticacionPorHeader (req, res, next) {
    try {
        const tokenReq = req.headers.authorization
        console.log(tokenReq)
        if (tokenReq == 'null') {
            return res.status(400).json({"status": 400, mensaje: 'Debes ingresar un token para acceder a esta ruta'})
        }
        if (tokenReq === undefined) {
            return res.status(400).json({"status": 400, mensaje: 'Debes ingresar un token para acceder a esta ruta'})
        }
        console.log(tokenReq)
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData);
        
        if ( tokenData && tokenData.data.id) {
            return tokenData.data
        } else {
            return res.status(400).json({"status": 400, mensaje: 'Token inválido'})
            
        }
    }catch (error){
        console.log(error);
        res.status(400).json({"status": 400, mensaje: 'Debes ingresar un token para acceder a esta ruta', error: error})
    }
}

module.exports = autenticacionPorHeader