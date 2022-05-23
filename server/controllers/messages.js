const { response } = require('express')

const getDataWithQuery = require('../helpers/queryMysql')

const getMessages = async (req, res = response) => {
    const { userId, receiverId } = req.body
    
    try {
        const queryToSearchChatUser = `SELECT * FROM chat_user WHERE user_id = '${userId}'`
        const results = await getDataWithQuery(queryToSearchChatUser)

        const queryToSearchChatUserReceiver = `SELECT * FROM chat_user WHERE user_id = '${receiverId}'`
        const resultsReceiver = await getDataWithQuery(queryToSearchChatUserReceiver)


        res.json({
            results,
            resultsReceiver
        })
    } catch(e) {
        console.error(e)
    }
}

module.exports = {
    getMessages,
}