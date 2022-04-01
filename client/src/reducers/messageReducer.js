import { types } from '../types/types'

const initialState = {
  listMessages: [
    // {
    //   roomId: 'mijel861999-angel861999',
    //   author: 'mijel861999',
    //   message: 'Hola, qué tal va todo',
    //   time: '04:20'
    // },
    // {
    //   roomId: 'mijel861999-angel861999',
    //   author: 'mijel861999',
    //   message: 'Hola, qué tal va todo2',
    //   time: '04:20'
    // },
    // {
    //   roomId: 'mijel861999-angel861999',
    //   author: 'mijel861999',
    //   message: 'Hola, qué tal va todo3',
    //   time: '04:20'
    // }
  ],
  listChats: [
    {
      receiver: 'Juanito',
      lastMessage: 'Hola Miguel, cómo anda todo?',
      hour: '04:20',
      roomId: 'mijel861999-miguel861999',
      isRead: false
    },
    {
      receiver: 'Angel',
      lastMessage: 'Hola Angel, podrías pagarme la plata que me debes?',
      hour: '04:24',
      roomId: 'mijel861999-angel861999',
      isRead: false
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
        listChats: state.listChats.map(chat => {
          if (chat.roomId === action.payload) {
            chat.isRead = true
          }
          return chat
        }),
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
    case types.messageLoadMessages:
      return {
        ...state,
        listMessages: action.payload
      }
    case types.messageAddMessage:
      return {
        ...state,
        listMessages: [...state.listMessages, action.payload]
      }
    case types.messageSetNewMessage:
      return {
        ...state,
        listChats: state.listChats.map((chat) => {
          if (chat.roomId === action.payload.roomId) {
            chat.lastMessage = action.payload.message
            chat.hour = action.payload.time
            chat.isRead = false
          }
          return chat
        })
      }
    default:
      return state
  }
}
