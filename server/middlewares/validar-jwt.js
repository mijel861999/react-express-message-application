const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token')

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay un token en la petición'
        })
    }

    try {
        const body = jwt.verify(token, process.env.JWT_SECRET)

        const { id, names } = body

        console.log('Valid JWT')
        console.log(id, names)
        req.id = id
        req.names = names

    } catch (e) {
        console.log(e)
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
}   

module.exports = {
    validarJWT
}