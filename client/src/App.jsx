import React from 'react'

// Components
import { Login } from './components/Login/Login'

// Pages
import ChatPage from './pages/ChatPage/ChatPage'

// Redux
import { useSelector } from 'react-redux'

// Styles
import './App.css'

function App () {
  const { isLogged } = useSelector(state => state.auth)

  return (
    <div className='App'>
      {
        isLogged
          ? (
            <ChatPage />
            )
          : (
            <Login />
            )
      }
    </div>
  )
}

export default App
