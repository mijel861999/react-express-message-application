import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { socket } from '../../Socket/Socket'
import Message from '../Message/Message'
import MessageAuthor from '../MessageAuthor/MessageAuthor'

// Actions
import { messageLoadMessages, messageSendMessage, messageAddMessage, messageReceiveMessage } from '../../actions/events'

import './chat.css'

export const Chat = () => {
  const dispatch = useDispatch()
  const { listMessages, roomId, receivor } = useSelector(state => state.messages)

  const { user } = useSelector(state => state.auth)

  const [message, setMessage] = useState('')
  const chatContainerRef = useRef()

  // RECIBE MENSAJE
  useEffect(() => {
    dispatch(messageReceiveMessage())
    console.log('Recibiendo mensajes')
  }, [socket])

  // Cargar mensajes
  useEffect(() => {
    dispatch(messageLoadMessages([]))
  }, [roomId])

  const handleInputChange = ({ target }) => {
    setMessage(target.value)
  }

  // ENVÍA MENSAJE
  const handleSubmit = async (e) => {
    e.preventDefault()

    // mensaje
    const messg = {
      roomId,
      user,
      message,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes()
    }

    // envia mensaje
    dispatch(messageSendMessage(messg))
    dispatch(messageAddMessage(messg))
    setMessage('')
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }

  return (
    <div className='chat'>
      {
        (roomId !== '')
          ? (
            <>
              <div
                className='messages'
                ref={chatContainerRef}
              >
                <h1>{receivor}</h1>
                {
                  listMessages.map((message, index) =>
                    (message.user === user)
                      ? (
                        <MessageAuthor
                          key={index}
                          message={message}
                        />
                        )
                      : (
                        <Message
                          key={index}
                          message={message}
                        />
                        )
                  )
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
            </>
            )
          : (
            <h1>Abre un chat para poder conversar!</h1>
            )
      }
    </div>
  )
}
