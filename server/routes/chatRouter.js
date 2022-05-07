const express = require('express')
const { json } = require('express/lib/response')

const router = express.Router()
const connectionMysql = require('../mysql/mysql')

// Get Chats
router.get('/:user', async(req, res) => {
    const {user} = req.params
    let id = 0
    const sql = `SELECT * FROM user WHERE username = '${user}'`

    await connectionMysql.query(sql, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            id = results[0].id
            
            const sqlChatUser = `SELECT * FROM chat_user WHERE user_id = ${id}`
            connectionMysql.query(sqlChatUser, (err, results) => {
                if (err) throw err
                if (results.length > 0) {
                    const chats_ids = []
                    console.log(results)
                    results.forEach(result => {
                        chats_ids.push(result.chat_id)
                    })

                    const str = chats_ids.join(',')
                    console.log(str)

                    const mysqlChat = `SELECT * FROM chat WHERE id IN (${str})`

                    connectionMysql.query(mysqlChat, (err, resultsChats) => {
                        if (err) throw err
                        if (resultsChats.length > 0) {
                            console.log(resultsChats)
                            
                            return res.json(resultsChats)
                        }
                    })
                    
                } else {
                    return res.send('Not results')
                }
            })
        } else {
            return res.send('Not results')
        }
    })
})

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