import React from 'react'

// Liberarías
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Hooks
import { useForm } from '../../hooks/useForm'

// Style
import './registerPage.css'

// Image
import logo from '../../images/Logo.png'
import { startRegister } from '../../actions/auth'

const RegisterPage = () => {
  const dispatch = useDispatch()

  const [formRegisterInputs, handleRegisterInputs] = useForm({
    rNames: '',
    rUser: '',
    rPassword: '',
    rPassword2: '',
    rEmail: ''
  })
  const { rNames, rUser, rPassword, rPassword2, rEmail } = formRegisterInputs

  const handleRegister = (e) => {
    e.preventDefault()
    if (rPassword !== rPassword2) {
      /* eslint-disable */
      return alert('Las contraseñas no coinciden');
      /* eslint-enable */
    }
    dispatch(startRegister({ rNames, rUser, rPassword, rEmail }))
  }

  return (
    <div className='login--container'>
      <div className='title--container'>
        <img
          src={logo}
          alt='Logo Image'
        />
        <h1>Registrate</h1>
      </div>
      <form
        className='login-form'
        onSubmit={handleRegister}
      >
        <input
          type='text'
          placeholder='Nombres'
          name='rNames'
          value={rNames}
          onChange={handleRegisterInputs}
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='Email'
          name='rEmail'
          value={rEmail}
          onChange={handleRegisterInputs}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Usuario'
          name='rUser'
          value={rUser}
          onChange={handleRegisterInputs}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          name='rPassword'
          value={rPassword}
          onChange={handleRegisterInputs}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Repeat yout passoword'
          name='rPassword2'
          value={rPassword2}
          onChange={handleRegisterInputs}
          autoComplete='off'
        />
        <section className='remenber-register--container'>
          <Link to='/login'>Sign up</Link>
        </section>
        <button>
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
