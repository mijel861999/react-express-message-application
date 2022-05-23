const express = require('express')
const usersRouter = require('./usersRouter')
const chatRouter = require('./chatRouter')
const messageRouter = require('./messageRouter')


function routerApi(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/users', usersRouter)
    router.use('/chat', chatRouter)
    router.use('/messages', messageRouter)
}

module.exports = routerApi