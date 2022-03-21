import React from 'react'
import './message.css'

const Message = ({message, name, date}) => {
  return (
    <div className='message--container'>
        <h3>Jorge</h3>
        <p>Mensaje</p>
        <h4>04:20</h4>
    </div>
  )
}

export default Message