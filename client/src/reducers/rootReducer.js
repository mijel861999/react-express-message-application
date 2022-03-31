import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { messageReducer } from './messageReducer'

export const rootReducer = combineReducers({
  messages: messageReducer,
  auth: authReducer
  // TODO: Add more reducers here
})
