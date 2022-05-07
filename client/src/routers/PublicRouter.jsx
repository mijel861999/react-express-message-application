import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRouter = ({ children, user }) => {
  if (user) {
    return <Navigate to='/' />
  }

  return children
}
