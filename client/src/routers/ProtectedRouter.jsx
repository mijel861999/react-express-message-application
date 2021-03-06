import React from 'react'

import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({ user, children }) => {
  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRouter
