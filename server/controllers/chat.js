const { response } = require('express')

const connectionMysql = require('../mysql/mysql')

const getChats = async (req, res = response) => {
    const { user } = req.params

    console.log('Get chats')
    console.log(user)
    let id = 0
    const sql = `SELECT * FROM user WHERE username = '${user.substring(1)}'`

    console.log(sql)

    await connectionMysql.query(sql, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            id = results[0].id

            console.log('Exit')
            
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
                            
                            return res.json({
                                ok: true,
                                resultsChats
                            })
                        }
                    })
                    
                } else {
                    console.log('No chats')
                    return res.json({
                        ok: false,
                        msg: 'No chats'
                    })
                }
            })
        } else {
            return res.send('Not results')
        }
    })
}

const createChat = async (req, res = response) => {
    const { roomId, user, status, receiver, last_message, hour } = req.body

    const sql = `INSERT INTO chat (room, status, receiver, last_message, hour) VALUES ('${roomId}', '${status}', '${receiver}' ,'${last_message}', '${hour}')`

    console.log('Sql create chat')
    console.log(sql)
    console.log('----')

    await connectionMysql.query(sql, async(err, results) => {
        if (err) throw err
        if (results.affectedRows > 0) {
            // BUSCAR IDS
            const sqlSearchIds = `SELECT * FROM user WHERE username = '${user}'`
            const idChat = results.insertId

            console.log('Sql Search ids')
            console.log(sqlSearchIds)
            console.log('----')    

            await connectionMysql.query(sqlSearchIds, async (err, results) => {
                if (err) throw err
                if (results.length > 0) {
                    const user_id = results[0].id       

                    const sqlSearchReceiver = `SELECT * FROM user WHERE username = '${receiver}'`
                    console.log('Sql search receiver')
                    console.log(sqlSearchReceiver)
                    console.log('----')    

                    await connectionMysql.query(sqlSearchReceiver, async (err, results) => {
                        if (err) throw err
                        if (results.length > 0) {
                            receiver_id = results[0].id

                            const sqlChatUser = `INSERT INTO chat_user (chat_id, user_id) VALUES ('${idChat}', '${user_id}')`

                            await connectionMysql.query(sqlChatUser, async (err, results) => {
                                console.log(results)
                                if (err) throw err
                                if (results.affectedRows > 0) {         
                                    const sqlChatReceiver = `INSERT INTO chat_user (chat_id, user_id) VALUES ('${idChat}', '${receiver_id}')`    

                                    await connectionMysql.query(sqlChatReceiver, (err, results) => {
                                        if (err) throw err
                                        if (results.affectedRows > 0) {
                                            return res.json({
                                                ok: true,
                                                msg: 'Chat created'
                                            })
                                        }
                                    }) 
                                }
                            })    
    
                        } else {
                            return res.json({
                                ok: false,
                                msg: 'The receiver does not exist'
                            })
                        }
                    })
                }
            }) 
        } else {
            return res.json({
                ok: false,
                msg: 'The user does not exist'
            })
        }
    })
}

module.exports = {
    getChats,
    createChat
}