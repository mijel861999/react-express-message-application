import React, {createContext, useReducer} from 'react'

const initialState = {
    ola: 'Hola',
    user: '',
    password: '',
    roomId: '',
    socket: null,
}

export const Context = createContext(initialState)

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
            ...state,
            user: action.payload
        }
    }      
  }, initialState) 

  return (
    <Context.Provider value={[ state, dispatch ]}>  
        {children}
    </Context.Provider>
  )
}
