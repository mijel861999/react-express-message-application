const express = require('express')
const { getChats, createChat } = require('../controllers/chat')

const router = express.Router()

// Get Chats
router.get('/:user', getChats)

// Create Chat
router.post('/create', createChat)


module.exports = router