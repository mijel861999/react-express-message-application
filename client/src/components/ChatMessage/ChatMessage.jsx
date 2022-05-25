import React from 'react'

import { useDispatch } from 'react-redux'
import { messageChangeReceivor, SetRoomIdChat } from '../../actions/events'

import './chatMessage.css'

const ChatMessage = ({ chat }) => {
  const dispatch = useDispatch()

  const handleActiveRoom = () => {
    console.log(chat)
    dispatch(messageChangeReceivor(chat.receiver))
    dispatch(SetRoomIdChat(chat.room))
  }

  return (
    <div
      className={`chat-message ${chat.status ? '' : 'chat-message__active'}`}
      onClick={handleActiveRoom}
    >
      <h1>{chat.receiver}</h1>
      <p><b>{chat.room}</b></p>
      <p>{chat.last_message}</p>
      <h3>{chat.hour}</h3>
    </div>
  )
}

export default ChatMessage
