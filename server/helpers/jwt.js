const jwt = require('jsonwebtoken')

const generarJWT = (id, names) => {
  return new Promise( (resolve, reject) => {
    const payload = { id, names }

    jwt.sign( payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    }, (err, token) => {
        if (err) {
          console.error('Error generando token', err)
          reject('No se pudo generar el token')
        }

        resolve(token)
    })
  })
}


module.exports = {
  generarJWT
}