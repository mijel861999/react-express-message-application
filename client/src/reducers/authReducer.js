import { types } from '../types/types'

const initialState = {
  user: '',
  password: '',
  isLogged: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        isLogged: true,
        ...action.payload
      }
    default:
      return state
  }
}
