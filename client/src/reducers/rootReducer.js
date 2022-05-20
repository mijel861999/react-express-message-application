import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { messageReducer } from './messageReducer'
import { chatReducer } from './chatReducer'

export const rootReducer = combineReducers({
  messages: messageReducer,
  auth: authReducer,
  chat: chatReducer
  // TODO: Add more reducers here
})
