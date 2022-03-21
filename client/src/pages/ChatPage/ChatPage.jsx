import React, {useState} from 'react'
import { Chat } from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'

import './chatPage.css'

const chats = [
  {
    receiver: 'Miguel',
    lastMessage: 'Hola Miguel, cómo anda todo?',
    hour: '04:20',
    roomId: 'mijel861999-miguel861999'
  },
  {
    receiver: 'Angel',
    lastMessage: 'Hola Angel, podrías pagarme la plata que me debes?',
    hour: '04:24',
    roomId: 'mijel861999-angel861999'
  }
]
  

const ChatPage = ({socket, author}) => {

  const [listChats, setListChats] = useState(chats)
  const [roomId, setRoomId] = useState('')

  return (
    <div className='chat--page'>
        <ChatList
          socket={socket}
          listChats={listChats}
          setListChats={setListChats}
          setRoomId={setRoomId}
        />
        <Chat 
          socket={socket}
          roomId={roomId}
          author={author}
        />
    </div>
  )
}

export default ChatPage