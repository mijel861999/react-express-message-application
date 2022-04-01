import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Components
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

// Actions
import { messageJoinAllRooms } from '../../actions/events'

import './chatPage.css'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { listChats } = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(messageJoinAllRooms())
  }, [listChats])

  return (
    <div className='chat--page'>
      <ChatList />
      <Chat />
    </div>
  )
}

export default ChatPage
