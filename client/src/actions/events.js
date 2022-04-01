import { socket } from '../Socket/Socket'
import { types } from '../types/types'

export const messageJoinAllRooms = () => {
  return (dispatch, getState) => {
    const { listChats } = getState().messages

    listChats.forEach(chat => {
      socket.emit('join_room', chat.roomId)
    })
  }
}

export const messageReceiveMessage = () => {
  return (dispatch, getState) => {
    socket.on('receive_message', messg => {
      const { roomId, listChats } = getState().messages
      console.log(listChats)
      if (roomId === messg.roomId) {
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

export const messageStartSetRoomId = (roomId) => {
  return (dispatch) => {
    dispatch(messageSetRoomId(roomId))
  }
}

export const messageSetNewMessage = (message) => ({
  type: types.messageSetNewMessage,
  payload: message
})

const messageSetRoomId = (roomId) => ({
  type: types.messageSetRoomId,
  payload: roomId
})

export const messageSendMessage = (message) => {
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

export const messageLoadMessages = (messages) => ({
  type: types.messageLoadMessages,
  payload: messages
})

export const messageAddMessage = (message) => ({
  type: types.messageAddMessage,
  payload: message
})
