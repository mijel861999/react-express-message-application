const express = require('express')
const usersRouter = require('./usersRouter')
const chatRouter = require('./chatRouter')


function routerApi(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/users', usersRouter)
    router.use('/chat', chatRouter)
}

module.exports = routerApi