import React from 'react'

import { useDispatch } from 'react-redux'
import { messageStartSetRoomId, messageChangeReceivor } from '../../actions/events'

import './chatMessage.css'

const ChatMessage = ({ chat }) => {
  const dispatch = useDispatch()

  const handleActiveRoom = () => {
    dispatch(messageChangeReceivor(chat.receiver))
    dispatch(messageStartSetRoomId(chat.roomId))
  }

  return (
    <div
      className={`chat-message ${chat.isRead ? '' : 'chat-message__active'}`}
      onClick={handleActiveRoom}
    >
      <h1>{chat.receiver}</h1>
      <p><b>{chat.roomId}</b></p>
      <p>{chat.lastMessage}</p>
      <h3>{chat.hour}</h3>
    </div>
  )
}

export default ChatMessage
