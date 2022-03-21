import React,{useEffect, useState, useRef} from 'react'
import Message from '../Message/Message'

import './chat.css'

export const Chat = ({socket, roomId, author}) => {

  console.log(roomId)

  const [listMessage, setListMessage] = useState([])
  const [message, setMessage] = useState('')

  const messageContainer = useRef() 

  const handleInputChange = ({target}) => {
    setMessage(target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const messg = {
      roomId,
      author,
      message,
      time: 
        new Date(Date.now()).getHours() + 
        ':' + 
        new Date(Date.now()).getMinutes(),
    }

    const messageResponse = await socket.emit('send_message', messg)
    const inputMessageContainer = document.getElementById('message-input')
    inputMessageContainer.value = ''

    const listCopy = listMessage
    listCopy.push(messg.message)

    setListMessage(listCopy)
  }

  useEffect(() => {
    socket.on('receive_message', messg => {
        const listCopy = listMessage
        listCopy.push(messg.message)
        setListMessage(listCopy)
        // setListMessage([...listMessage, messg.message])
        console.log(listMessage)
        // const newMessage = document.createElement('h3')
        // newMessage.innerText = messg.message
        // messageContainer.current.appendChild(newMessage)
    })
  }, [socket])

  if (roomId !== '') {
    return (
      <div className='chat'>
        <div
          ref={messageContainer}
          className='messages'
        >
          {
            listMessage.map( (message, index) => (
              <Message key={index}>
              </Message>
            ))
          }  
        </div>
        <form
          onSubmit={handleSubmit}
          className='input-container'
        >
            <input
              id='message-input'
              type='text'
              value={message}
              onChange={handleInputChange}
              autoComplete='off'
              name='message'
              placeholder='Mensaje...'
            />
            <button>Send</button>
        </form>
      </div>
    )
  }else {
    return (
      <div className='chat'>
        Abre un chat para poder conversar!
      </div> 
    )
  } 
}