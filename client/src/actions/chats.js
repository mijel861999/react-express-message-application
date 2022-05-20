import { socket } from '../Socket/Socket'
import { types } from '../types/types'
import { fetchConToken } from '../helpers/fetch'
import { generateRandomRoomId } from '../helpers/randomRoomId'

// Librerías
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

// CHATS

export const StartLoadChats = (user) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`chat/:${user}`)
      const chatsData = await resp.json()

      console.log(chatsData)

      if (chatsData.ok) {
        dispatch(LoadChats(chatsData.resultsChats))
        dispatch(JoinAllChats())
      }
    } catch (e) {
      Swal.fire('Error1', e, 'error')
    }
  }
}

const LoadChats = (chats) => ({
  type: types.chatsLoadChats,
  payload: chats
})

export const JoinAllChats = () => {
  return (dispatch, getState) => {
    // Recuperando state
    const { listChats } = getState().chat

    // Uniendote a todos los sockets
    listChats.forEach(chat => {
      socket.emit('join_room', chat.room)
    })
  }
}

export const StartAddChat = (chat) => {
  // JSON -> { room , status, receiver, last_message, hour }
  return async (dispatch) => {
    try {
      const chatWithRandomRoom = { ...chat, roomId: generateRandomRoomId() }
      const resp = await fetchConToken('chat/create', chatWithRandomRoom, 'POST')
      const body = await resp.json()

      if (body.ok) {
        dispatch(AddChat({ id: '', room: chatWithRandomRoom.roomId, status: chatWithRandomRoom.status, receiver: chatWithRandomRoom.receiver, last_message: 'No hay mensajes aún', hour: chatWithRandomRoom.hour }))
        dispatch(JoinAllChats())
      } else {
        Swal.fire('Error2', body.msg, 'error')
      }
    } catch (e) {
      console.error(e)
    }
  }
}

const AddChat = (chat) => ({
  type: types.chatsAddRoom,
  payload: chat
})
