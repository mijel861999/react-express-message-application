import React from 'react'

// Components
// import { Login } from './components/Login/Login'

// Pages
// import ChatPage from './pages/ChatPage/ChatPage'

// Router
import AppRouter from './routers/AppRouter'

// Styles
import './App.css'

function App () {
  return (
    // <div className='App'>
    //   {
    //     isLogged
    //       ? (
    //         <ChatPage />
    //         )
    //       : (
    //         <Login />
    //         )
    //   }
    // </div>
    <AppRouter />
  )
}

export default App
