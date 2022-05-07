const express = require('express')

const router = express.Router()
const connectionMysql = require('../mysql/mysql')

const { createUser, chakeUser, renewUser, loginUser } = require('../controllers/auth')

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { route } = require('express/lib/application')
const { validarJWT } = require('../middlewares/validar-jwt')

// All costumers

// router.get('/:id', (req, res) => {
//     const sql = `SELECT * FROM user WHERE id = ${req.params.id}`
//         connectionMysql.query(sql, (err, results) => {
//             if (err) throw err
//             if (results.length > 0) {
//                 res.json(results)
//             } else {
//                 res.send('Not results')
//             }
//         })
// })

router.post('/', loginUser)

router.post('/add', [
    check('names', 'El nombre no es válido').not().isEmpty().isLength({ max: 60 }),
    check('username', 'El nombre de usuario no es válido').not().isEmpty().isLength({ max: 15 }),
    check('email', 'El email no es válido').not().isEmpty().isEmail(),
    check('password', 'La contraseña no es válida').not().isEmpty(),
    validarCampos
], createUser)

router.get('/renew', validarJWT, renewUser)

router.get('/prueba', chakeUser)

router.put('/update/:id', (req, res) => {
    res.send('Update user')
})

router.delete('/delete/:id', (req, res) => {
    res.send('Delete user')
})

module.exports = router