import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import api from '../lib/axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await api.post('/tourists/login', { email, password })
      const tourist = res.data.tourist
      const token = res.data.token

      localStorage.setItem('tourist', JSON.stringify(tourist))
      localStorage.setItem('token', token)
      dispatch({ type: 'LOGIN', payload: tourist })
      return true
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
