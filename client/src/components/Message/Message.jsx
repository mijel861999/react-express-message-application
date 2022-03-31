import React from 'react'
import './message.css'

const Message = ({ message }) => {
  console.log(message)

  return (
    <div className='message--container'>
      <h3>{message.user}</h3>
      <p>{message.message}</p>
      <h4>{message.time}</h4>
    </div>
  )
}

export default Message
