import React from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'

import './chatList.css'


const ChatList = ({socket ,listChats, setListChats, setRoomId}) => {

  const handleAddChat = () => {
    setListChats([...listChats, {
      receiver: 'Angie',
      lastMessage: 'Hola bb, qué haces?',
      hour: '04:25',
    }])
  }

  
  return (
    <div className='chat-list'>
      <div className='chat-list--searcher'>
          <input placeholder='Buscar...'/>
          <button
            onClick={handleAddChat} 
          >
            +
          </button>
      </div>
      <div className='chat-list--container'>
        {
          listChats.map( (chat, index) => (
              <ChatMessage 
                key={index}
                socket={socket}
                chat={chat}
                setRoomId={setRoomId}
              />
          ))
        } 
      </div>
    </div>
  )
}

export default ChatList