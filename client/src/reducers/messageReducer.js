import { types } from '../types/types'

const initialState = {
  listMessages: [
    {
      roomId: 'mijel861999-angel861999',
      author: 'mijel861999',
      message: 'Hola, qué tal va todo',
      time: '04:20'
    },
    {
      roomId: 'mijel861999-angel861999',
      author: 'mijel861999',
      message: 'Hola, qué tal va todo2',
      time: '04:20'
    },
    {
      roomId: 'mijel861999-angel861999',
      author: 'mijel861999',
      message: 'Hola, qué tal va todo3',
      time: '04:20'
    }
  ],
  listChats: [
    {
      receiver: 'Juanito',
      lastMessage: 'Hola Miguel, cómo anda todo?',
      hour: '04:20',
      roomId: 'mijel861999-miguel861999'
    },
    {
      receiver: 'Angel',
      lastMessage: 'Hola Angel, podrías pagarme la plata que me debes?',
      hour: '04:24',
      roomId: 'mijel861999-angel861999'
    }
  ],
  roomId: '',
  receivor: ''
}

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.messageSetRoomId:
      return {
        ...state,
        roomId: action.payload
      }
    case types.messageAddChat:
      return {
        ...state,
        listChats: [...state.listChats, action.payload]
      }
    case types.messageChangeReceivor:
      return {
        ...state,
        receivor: action.payload
      }
    default:
      return state
  }
}
