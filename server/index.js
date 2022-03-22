const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const connectionMysql = require('./mysql/mysql')
const routerApi = require('./routes')


// Mysql
connectionMysql.connect(function(e){
    if(e) {
        throw e
    } else {
        console.log('Conexión exitosa')
    }
});

app.use(express.json())
app.use(cors())


// ROUTER
routerApi(app)


// Socket
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})


io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join_room', data => {
        socket.join(data)
        console.log(`The user ${socket.id} joined room ${data}`)
    })

    socket.on('send_message', data => {
        console.log(data)
        console.log(data.roomId)
        socket.to(data.roomId).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})



server.listen(3001, () => {
    console.log(`Your server is running in the port ${3001}`)
})