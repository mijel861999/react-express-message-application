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

module.exports = {
    getChats,
}