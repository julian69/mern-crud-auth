import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('UseAuth must be uset within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (userParam) => {
    try {
      const res = await registerRequest(userParam)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const signIn = async (userParam) => {
    try {
      const res = await loginRequest(userParam)

      setIsAuthenticated(true)
      setUser(res.data)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrors([])
    }, 8000)

    return () => clearTimeout(timerId)
  }, [errors])

  useEffect(() => {
    const setParams = (isAuth, isLoading, userParams) => {
      setIsAuthenticated(isAuth)
      setLoading(isLoading)
      setUser(userParams)
    }

    const checkLogin = async () => {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setParams(false, false, null)
        return
      }

      try {
        const res = await verifyTokenRequest(cookies.token)

        if (!res.data) {
          setParams(false, false, null)
          return
        }

        setParams(true, false, res.data)
      } catch (error) {
        setParams(false, false, null)
      }
    }

    checkLogin()
  }, [])

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      user,
      isAuthenticated,
      errors,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}