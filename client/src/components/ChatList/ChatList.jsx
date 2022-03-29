import React, {useState} from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'
import Modal from 'react-modal'

import './chatList.css'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

Modal.setAppElement('#root');

const ChatList = ({author, socket, setReceivor ,listChats, setListChats, setRoomId}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [nameReceivor, setNameReceivor] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleInputChange = ({target}) => {
    setNameReceivor(target.value)
  }

  const handleSearchInputChange = ({target}) => {
    setSearchInput(target.value)
  }  

  const handleCreate = (e) => {
    e.preventDefault()
    setListChats([...listChats, {
      receiver: nameReceivor,
      lastMessage: 'No ha habido mensajes aún',
      hour: new Date(Date.now()).getHours() + 
        ':' + 
        new Date(Date.now()).getMinutes(),
      roomId: author + '-' + nameReceivor
    }])
    closeModal()
    setNameReceivor('')
  }

  
  return (
    <div className='chat-list'>
      <Modal
        isOpen={modalIsOpen} 
        style={customStyles}
      >
        <div className='modal'>
          <button
            onClick={closeModal} 
            className='modal-close--button'
          >
            close
          </button>
          <form>
            <label>Usuario</label>
            <input 
              placeholder='Nombre del usuario...' 
              onChange={handleInputChange}
              value={nameReceivor}
            />
            <button onClick={handleCreate}>Crear</button>
          </form>
        </div> 
      </Modal>
      <div className='chat-list--searcher'>
          <input
            placeholder='Buscar...'
            onChange={handleSearchInputChange}
            value={searchInput}
          />
          <button
            onClick={openModal} 
          >
            +
          </button>
          
      </div>
      <div className='chat-list--container'>
        {
          listChats.filter(chat => chat.receiver.includes(searchInput)).map( (chat, index) => (
            <ChatMessage 
                key={index}
                socket={socket}
                chat={chat}
                setRoomId={setRoomId}
                setReceivor={setReceivor}
              />
          ))
        } 
      </div>
    </div>
  )
}

export default ChatList