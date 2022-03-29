import React, {useRef, useState, useContext} from 'react'
import './App.css'
import io from 'socket.io-client'
import { Login } from './components/Login/Login'
import { Chat } from './components/Chat/Chat'
import ChatPage from './pages/ChatPage/ChatPage'
import { Context } from './store/Store'


const socket = io.connect('http://localhost:3001')

function App() {
  const [loginInputs, setLoginInputs] = useState({
    user: 'mijelpalcabello',
    password: 'miguel861999',
    roomId: 'room1'
  })

  const [state, dispatch] = useContext(Context)

  console.log(state)
  const {user, password, roomId} = loginInputs

  const [loged, setLoged] = useState(false);

  return (
    <div className="App">
      {
        loged ? (
          <ChatPage
            socket={socket}
            author={user}
          />
        ) : (
          <Login
            socket={socket}
            user={user}
            password={password}
            roomId={roomId}
            loginInputs={loginInputs}
            setLoginInputs={setLoginInputs}
            setLoged={setLoged}
          />
          
        )
      }
    </div>
  )
}

export default App
