import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Components
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

// Actions
import { StartLoadChats } from '../../actions/chats'

import './chatPage.css'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(StartLoadChats(user))
  }, [user])

  return (
    <div className='App'>
      <div className='chat--page'>
        <ChatList />
        <Chat />
      </div>
    </div>
  )
}

export default ChatPage
