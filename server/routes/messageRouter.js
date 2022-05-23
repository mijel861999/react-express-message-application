const express = require('express')
const { getMessages } = require('../controllers/messages')
const router = express.Router()

// RUTAS
router.get('/:userId', getMessages)


module.exports = router