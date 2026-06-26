import { useState } from 'react'
import { useAuthContext } from './useAuthContext.js'
import api from '../lib/axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await api.post('/tourists/signup', { name, email, password })
      const tourist = res.data.tourist
      const token = res.data.token

      localStorage.setItem('tourist', JSON.stringify(tourist))
      localStorage.setItem('token', token)
      dispatch({ type: 'LOGIN', payload: tourist })
      return true
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
