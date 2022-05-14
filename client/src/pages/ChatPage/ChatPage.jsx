import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Components
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

// Actions
import { /* messageJoinAllRooms, */ messageStartLoadChats } from '../../actions/events'

import './chatPage.css'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    console.log('Cargando mensajes')
    dispatch(messageStartLoadChats(user))
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
