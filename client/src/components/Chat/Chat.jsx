import React,{useEffect, useRef, useState} from 'react'
import Message from '../Message/Message'
import MessageAuthor from '../MessageAuthor/MessageAuthor'

import './chat.css'

const listMessageInitialState = [
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo',
    time: '04:20'
  },
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo2',
    time: '04:20'
  },
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo3',
    time: '04:20'
  }
]

const listMessageInitialState1 = [
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo',
    time: '04:20'
  },
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo2',
    time: '04:20'
  },
  {
    roomId: 'mijel861999-angel861999',
    author: 'mijel861999',
    message: 'Hola, qué tal va todo3',
    time: '04:20'
  }
]

export const Chat = ({socket, roomId, author}) => {
  const [listMessage, setListMessage] = useState(listMessageInitialState)
  const [message, setMessage] = useState('')
  const chatContainerRef = useRef()
  

  // RECIBE MENSAJE
  useEffect(() => {
    socket.on('receive_message', messg => {
      const listCopy = listMessage
      listCopy.push(messg)
      setListMessage(listCopy) 
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      setMessage(message => message + ' ')
    })
  }, [socket])

  useEffect(() => {
    console.log('Cambiar la lista de mensajes')
    setListMessage([])
    // TODO: Hacer llamado a la api para cambiar ListMessage
  }, [roomId])

  const handleInputChange = ({target}) => {
    setMessage(target.value)
  }

  // ENVÍA MENSAJE
  const handleSubmit = async (e) => {
    e.preventDefault()

    // mensaje
    const messg = {
      roomId,
      author,
      message,
      time: 
        new Date(Date.now()).getHours() + 
        ':' + 
        new Date(Date.now()).getMinutes(),
    }

    // envia mensaje
    await socket.emit('send_message', messg)

    const listCopy = listMessage
    listCopy.push(messg)

    // Agregando el mensaje a la lista de mensajes
    setListMessage(listCopy)
    setMessage('')
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight  
  }

  return (
    <div className='chat'>
      {
        (roomId !== '') ? (
          <>
            <div
              className='messages'
              ref={chatContainerRef}
            >
              {
                listMessage.map( (message, index) => 
                  (message.author == author) ? (
                    <MessageAuthor
                      key={index} 
                      message={message}
                    >
                    </MessageAuthor>
                  ) : (
                    <Message
                      key={index}
                      message={message}
                    >
                    </Message>
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
        ): (
          <h1>Abre un chat para poder conversar!</h1>
        )
      }
    </div>
  ) 

  // if (roomId !== '') {
  //   console.log('Renderiza el chat')
  //   return (
  //     <div className='chat'>
  //       <div
  //         className='messages'
  //         ref={chatContainerRef}
  //       >
  //         {
  //           listMessage.map( (message, index) => (
  //             <Message
  //               key={index}
  //               message={message}
  //             >
  //             </Message>
  //           ))
  //         }  
  //       </div>
  //       <form
  //         onSubmit={handleSubmit}
  //         className='input-container'
  //       >
  //           <input
  //             id='message-input'
  //             type='text'
  //             value={message}
  //             onChange={handleInputChange}
  //             autoComplete='off'
  //             name='message'
  //             placeholder='Mensaje...'
  //           />
  //           <button>Send</button>
  //       </form>
  //     </div>
  //   )
  // }else {
  //   return (
  //     <div className='chat'>
  //       Abre un chat para poder conversar!
  //     </div> 
  //   )
  // } 
}