import React from 'react'

// Redux
import { useDispatch } from 'react-redux'

// Hooks
import { useForm } from '../../hooks/useForm'

// Styles
import './login.css'

// Actions
import { startLogin } from '../../actions/auth'

// Images
import logo from '../../images/Logo.png'

export const Login = () => {
  const dispatch = useDispatch()

  const [formLoginInputs, handleInputChange] = useForm({
    lUser: '',
    lPassword: ''
  })

  const { lUser, lPassword } = formLoginInputs

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lUser, lPassword))
  }

  return (
    <div className='login--container'>
      <div className='title--container'>
        <img
          src={logo}
          alt='Logo Image'
        />
        <h1>LOGIN</h1>
        <p>La mejor manera de comunicarte.</p>
      </div>
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
        <section className='remenber-register--container'>
          <div>
            <input
              className='login-form--checkbox'
              type='checkbox'
              name='remember'
            />
            <label>Recordarme</label>
          </div>
          <a href='/'>Forgot password?</a>
        </section>
        <button>
          Ingresar
        </button>
      </form>
    </div>
  )
}
