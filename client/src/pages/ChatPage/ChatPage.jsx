import React from 'react'

// Components
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

import './chatPage.css'

const ChatPage = () => {
  return (
    <div className='chat--page'>
      <ChatList />
      <Chat />
    </div>
  )
}

export default ChatPage
