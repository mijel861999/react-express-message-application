import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// React router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import ChatPage from '../pages/ChatPage/ChatPage'

// Routes
import ProtectedRouter from './ProtectedRouter'
import { startChecking } from '../actions/auth'
import { PublicRouter } from './PublicRouter'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'

const AppRouter = () => {
  const dispatch = useDispatch()
  const { user, checking } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <h1>Espere...</h1>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <ProtectedRouter user={user}>
                <ChatPage />
              </ProtectedRouter>
            }
          />
          <Route
            path='login'
            element={
              <PublicRouter user={user}>
                <LoginPage />
              </PublicRouter>
            }
          />
          <Route
            path='register'
            element={
              <PublicRouter user={user}>
                <RegisterPage />
              </PublicRouter>
            }
          />
          <Route
            path='*'
            element={<p>There's nothing here: 404!</p>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
