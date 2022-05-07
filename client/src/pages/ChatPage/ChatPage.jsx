import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

// Components
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

// Actions
import { /* messageJoinAllRooms, */ messageStartLoadChats } from '../../actions/events'

import './chatPage.css'

const ChatPage = () => {
  const dispatch = useDispatch()
  // const { listChats } = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(messageStartLoadChats())
  }, [])

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
