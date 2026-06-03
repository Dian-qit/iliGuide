import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  // Rehydrate from localStorage on first load
  useEffect(() => {
    const tourist = JSON.parse(localStorage.getItem('tourist'))
    if (tourist) {
      dispatch({ type: 'LOGIN', payload: tourist })
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}