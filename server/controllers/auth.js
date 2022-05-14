const { response } = require('express')
const bcrypt = require('bcryptjs')

const { generarJWT } = require('../helpers/jwt')
const connectionMysql = require('../mysql/mysql')


const createUser = (req, res = response) => {
  const { names, username, email, password } = req.body

  try {
    const sqlSearch = `SELECT * FROM user WHERE email = '${email}'`
    connectionMysql.query(sqlSearch, (err, results) => {
        if(err) throw err
        if(results.length > 0) {
          return res.status(400).json({
            ok: false,
            msg: 'User already exists'
          })
        } else {
          const sql = 'INSERT INTO user SET ?'

          console.log(results)

          // Encriptar contraseña
          const salt = bcrypt.genSaltSync()
          const passwordEncrypt = bcrypt.hashSync(password, salt)


          const userObj = {
            names,
            username,
            password: passwordEncrypt,
            email
          }

          connectionMysql.query(sql, userObj, (err, results) => {
            if (err) throw err
            if (results.affectedRows > 0) {
              const sqlSearch = `SELECT * FROM user WHERE email = '${email}'`
              
              connectionMysql.query(sqlSearch, async (err, results) => {
                if (err) throw err
                if (results.length > 0) {
                  const token = await generarJWT(results[0].id, results[0].names)

                  console.log(results[0].id, results[0].names)

                  return res.json({
                    ok: true,
                    message: 'User added',
                    id: results[0].id,
                    names: results[0].names,
                    token
                  })
                }
              }) 
            }         
          })
        }
    })
    
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador, no se pudo crear el usuario'
    })
  }
}

const loginUser = (req, res = response) => {
  const { body } = req
  const { email, password } = body

  try {
    const sqlSearch = `SELECT * FROM user WHERE email = '${email}'`
    connectionMysql.query(sqlSearch, async (err, results) => {
      if(err) throw err
      if(results.length > 0) {

        console.log(results[0].id)
        // Comparar contraseña
        const validPassword = bcrypt.compareSync( password, results[0].password)

        if(!validPassword) {
          return res.status(400).json({
            ok: false,
            msg: 'Password incorrect'
          })
        }

        const token = await generarJWT(results[0].id, results[0].names)
        
        return res.status(200).json({
          ok: true,
          msg: 'Logged',
          id: results[0].id,
          email,
          username: results[0].username,
          names: results[0].names,
          token
        })
      } else {
        return res.status(400).json({
          ok: false,
          msg: 'User not found'
        })
      } 
    })
  } catch (e) { 
    console.error(e)
  }
}

const chakeUser = (req, res = response) => {
  console.log(process.env.JWT_SECRET)
  res.status(200).json({
    ok: true,
    msg: 'User is authenticated'
  })
}

const renewUser = async (req, res = response) => {
  const id = req.id
  const names = req.names

  try {
    const sqlSearch = `SELECT * FROM user WHERE id = '${id}'`
    connectionMysql.query(sqlSearch, async (err, results) => {
      if(err) throw err
      if(results.length > 0) {
        const token = await generarJWT(id, names)
        res.json({
          ok: true,
          msg: 'Renew',
          id,
          names,
          username: results[0].username,
          email: results[0].email,
          token
        })
      }
    })
  } catch (e) {
    console.error(e)
  } 
}

module.exports = {
  createUser,
  chakeUser,
  renewUser,
  loginUser
}