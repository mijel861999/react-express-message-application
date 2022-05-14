const express = require('express')
const { getChats } = require('../controllers/chat')

const router = express.Router()

// Get Chats
router.get('/:user', getChats)

// Create Chat
router.post('/create', async(req, res) => {
    const { room , status, receiver, last_message, hour } = req.body

    const sql = `INSERT INTO chat (room, status, receiver, last_message, hour) VALUES ('${room}', '${status}', '${receiver}' ,'${last_message}', '${hour}')`

    await connectionMysql.query(sql, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            return res.send('Create chat')
        } else {
            return res.send('Not results')
        }
    })
})


module.exports = router