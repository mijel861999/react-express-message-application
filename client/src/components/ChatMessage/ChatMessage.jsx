import React from 'react'

import './chatMessage.css'

const ChatMessage = ({socket ,chat, setRoomId, setReceivor}) => {

  const handleActiveRoom = () => {
    setRoomId(chat.roomId)
    socket.emit('join_room', chat.roomId)
    setReceivor(chat.receiver)
  }

  return (
    <div
      className='chat-message'
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