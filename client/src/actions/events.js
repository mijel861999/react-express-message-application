import { socket } from '../Socket/Socket'
import { types } from '../types/types'

export const messageStartSetRoomId = (roomId) => {
  return (dispatch) => {
    socket.emit('join_room', roomId)
    dispatch(messageSetRoomId(roomId))
  }
}

const messageSetRoomId = (roomId) => ({
  type: types.messageSetRoomId,
  payload: roomId
})

export const messageSendMessage = (message) => {
  console.log('Enviar mensaje')
  return async () => {
    await socket.emit('send_message', message)
  }
}

export const messageAddChat = (chat) => ({
  type: types.messageAddChat,
  payload: chat
})

export const messageChangeReceivor = (receivor) => ({
  type: types.messageChangeReceivor,
  payload: receivor
})
