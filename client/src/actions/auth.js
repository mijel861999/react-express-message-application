import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken('users', { email, password }, 'POST')
      const body = await resp.json()

      if (body.ok) {
        /* eslint-disable */
        localStorage.setItem('token', body.token)
        localStorage.setItem('token-init-date', new Date().getTime())
        /* eslint-enable */
        dispatch(SetLogin({ user: body.username, email: body.email }))
      } else {
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error')
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const SetLogin = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('users/renew')
      const body = await resp.json()

      if (body.ok) {
        /* eslint-disable */
        localStorage.setItem('token', body.token)
        localStorage.setItem('token-init-date', new Date().getTime())

        dispatch(SetLogin({ user: body.username, email: body.email }))
      } else {
        console.log(body)
        dispatch(checkingFinish())
      }
    } catch (e) {
      console.error(e)
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

export const startRegister = (user) => {
  const { rNames, rUser, rPassword, rEmail } = user
  return async (dispatch) => {
    const resp = await fetchSinToken('users/add', { names: rNames, username: rUser, password: rPassword, email: rEmail }, 'POST')
    const body = await resp.json()

    console.log(body)

    if (body.ok) {
      /* eslint-disable */
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(SetLogin({ user: rUser, email: rEmail }))
      /* esling-enable */
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(Logout())
  }
}

const Logout = () => ({
  type: types.authLogout
})  
