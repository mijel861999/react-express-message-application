import React from 'react'

import './MessageAuthor.css'

const MessageAuthor = ({ message }) => {
  console.log(message.author)

  return (
    <div className='message-author--container'>
      <h3>{message.user}</h3>
      <p>{message.message}</p>
      <h4>{message.time}</h4>
    </div>
  )
}

export default MessageAuthor
