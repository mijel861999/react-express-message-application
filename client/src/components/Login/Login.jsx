import React, {forwardRef, useImperativeHandle, useState} from 'react'
import './login.css'

export const Login = ({socket, user, password, roomId, setLoginInputs, loginInputs, setLoged}) => {

  const handleInputChange = ({ target }) => {
    setLoginInputs({...loginInputs, [target.name]: target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // socket.emit('join_room', roomId)
    setLoged(true)
  }

  return ( 
    <div>
      <form
      className='login-form'
      onSubmit={handleLogin}
    >
        <input
            type='text'
            placeholder='Usuario'
            name='user'
            value={user}
            onChange={handleInputChange}
        /> 
        <input
            type='password'
            placeholder='Contraseña'
            name='password'
            value={password}
            onChange={handleInputChange}
        />
        <input
            type='text'
            placeholder='RoomId'
            name='roomId'
            value={roomId}
            onChange={handleInputChange}
        />
        <button>
          Login to sala
        </button>
      </form>
    </div> 
  )
}