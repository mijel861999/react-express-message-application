import { types } from '../types/types'

export const SetLogin = (user) => ({
  type: types.authLogin,
  payload: user
})
