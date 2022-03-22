const express = require('express')

const router = express.Router()
const connectionMysql = require('../mysql/mysql')

// All costumers
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users'

    connectionMysql.query(sql, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            res.json(results)
        } else {
            res.send('Not results')
        }
    })
})

router.post('/add', (req, res) => {
    res.send('New user')
})

router.put('/update/:id', (req, res) => {
    res.send('Update user')
})

router.delete('/delete/:id', (req, res) => {
    res.send('Delete user')
})

module.exports = router