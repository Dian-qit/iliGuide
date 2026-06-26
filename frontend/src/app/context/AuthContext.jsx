import { useReducer, useEffect } from 'react'
import { AuthContext, authReducer } from './authContextValue'

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

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
