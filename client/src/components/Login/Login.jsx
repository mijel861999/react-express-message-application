import React from 'react'

// Redux
import { useDispatch } from 'react-redux'

// Hooks
import { useForm } from '../../hooks/useForm'

// Styles
import './login.css'

// Actions
import { SetLogin } from '../../actions/auth'

export const Login = () => {
  const dispatch = useDispatch()

  const [formLoginInputs, handleInputChange] = useForm({
    lUser: 'mijelpalcabello',
    lPassword: 'miguel861999'
  })

  const { lUser, lPassword } = formLoginInputs

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(SetLogin({ user: lUser, password: lPassword }))
  }

  return (
    <div className='login--container'>
      <h1>LOGIN</h1>
      <form
        className='login-form'
        onSubmit={handleLogin}
      >
        <input
          type='text'
          placeholder='Usuario'
          name='lUser'
          value={lUser}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Contraseña'
          name='lPassword'
          value={lPassword}
          onChange={handleInputChange}
        />
        <button>
          Ingresar
        </button>
        <button>
          Registro
        </button>
      </form>
    </div>
  )
}
