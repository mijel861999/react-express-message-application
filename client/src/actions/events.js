import { socket } from '../Socket/Socket'
import { types } from '../types/types'

export const messageReceiveMessage = () => {
  return (dispatch, getState) => {
    socket.on('receive_message', messg => {
      const { roomId, listChats } = getState().messages
      console.log(listChats)
      if (roomId === messg.roomId) {
        listChats.forEach((chat, index) => {
          if (chat.roomId === messg.roomId) {
            listChats.push(...listChats.splice(0, index))
          }
        })
        dispatch(messageAddMessage(messg))
      } else {
        // const copyArray = listChats
        listChats.forEach((chat, index) => {
          if (chat.roomId === messg.roomId) {
            listChats.push(...listChats.splice(0, index))
          }
        })
        dispatch(messageSetNewMessage(messg))
      }
    })
  }
}

export const messageSetNewMessage = (message) => ({
  type: types.messageSetNewMessage,
  payload: message
})

export const messageChangeReceivor = (receivor) => ({
  type: types.messageChangeReceivor,
  payload: receivor
})

export const messageLoadMessages = (messages) => ({
  type: types.messageLoadMessages,
  payload: messages
})

export const messageAddMessage = (message) => ({
  type: types.messageAddMessage,
  payload: message
})

export const messageSendMessage = (message) => {
  return async () => {
    await socket.emit('send_message', message)
  }
}

export const SetRoomIdChat = (roomId) => ({
  type: types.messageSetRoomId,
  payload: roomId
})
