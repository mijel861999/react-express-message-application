import { types } from '../types/types'

const initialState = {
  listChats: []
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.chatsAddRoom:
      return {
        ...state,
        listChats: [...state.listChats, action.payload]
      }
    case types.chatsLoadChats:
      return {
        ...state,
        listChats: action.payload
      }
    default:
      return state
  }
}
