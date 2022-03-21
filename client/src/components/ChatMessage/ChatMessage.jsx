import React from 'react'

import './chatMessage.css'

const ChatMessage = ({socket ,chat, setRoomId}) => {

  const handleActiveRoom = () => {
    console.log(chat.roomId)
    setRoomId(chat.roomId)
    socket.emit('join_room', chat.roomId)
  }

  return (
    <div
      className='chat-message'
      onClick={handleActiveRoom}
    >
      <h1>{chat.receiver}</h1> 
      <p>{chat.lastMessage}</p>
      <h3>{chat.hour}</h3>
    </div>
  )
}

export default ChatMessage