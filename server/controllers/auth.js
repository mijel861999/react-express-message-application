const { response } = require('express')
const bcrypt = require('bcryptjs')

const { generarJWT } = require('../helpers/jwt')
const connectionMysql = require('../mysql/mysql')
const getDataWithQuery = require('../helpers/queryMysql')

const createUser = async (req, res = response) => {
  const { names, username, email, password } = req.body

  try {
    const queryToSearchUser = `SELECT * FROM user WHERE email = '${email}'`
    const results = await getDataWithQuery(queryToSearchUser)
    const resultsData = results[0]

    if ( resultsData ) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists'
      })
    }

    const queryToInsterUser = `INSERT INTO user SET ?`

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    const passwordEncrypt = bcrypt.hashSync(password, salt)

    const userObj ={
      names,
      username,
      password: passwordEncrypt,
      email
    }

    const resultToInstert = await getDataWithQuery(queryToInsterUser, userObj)
    const id = resultToInstert.insertId

    const token = await generarJWT(id, names)

    return res.status(200).json({
      ok: true,
      message: 'User added',
      id,
      names,
      token
    })
  } catch(e) {
    console.error(e)
  }
}

const loginUser = async (req, res = response) => {
  const { body } = req
  const { email, password: passwordRequest } = body

  try {
    
    const queryToSearchUser = `SELECT * FROM user WHERE email = '${email}'`
    const results = await getDataWithQuery(queryToSearchUser)
    const resultsData = results[0]

    if( !resultsData ) {
      return res.status(400).json({
        ok: false,
        msg: 'User not found'
      })
    }

    const realPassword = resultsData.password
    const id = resultsData.id
    const names = resultsData.names
    const username = resultsData.username

    const validPassword = bcrypt.compareSync( passwordRequest, realPassword)

    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password Incorrect'
      })
    }

    const token = await generarJWT(id, names)

    return res.status(200).json({
      ok: true,
      msg: 'Logged',
      id,
      email,
      username: username,
      names: names,
      token
    }) 
  } catch (e) {
    console.error(e)
  }
}

const renewUser = async (req, res = response) => {
  // VIENEN DEL TOKEN
  const { id, names } = req

  try {
    const queryToSearchUserWithId = `SELECT * FROM user WHERE id = '${id}'`

    const results = await getDataWithQuery(queryToSearchUserWithId)
    const resultsData = results[0]

    const username = resultsData.username
    const email = resultsData.email

    if( !resultsData ) {
      return res.status(400).json({
        ok: false,
        msg: 'User not found'
      })
    }

    const token = await generarJWT(id, names)
    return res.status(200).json({
      ok: true,
      msg: 'Renew',
      id,
      names,
      username,
      email,
      token
    })
  } catch (e) {
    console.error(e)
  } 
}

const deleteUser = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'User deleted'
  })
}

module.exports = {
  createUser,
  renewUser,
  loginUser,
  deleteUser
}