import { createContext, useContext, useEffect, useState } from 'react'

import { registerRequest, loginRequest } from '../api/auth'

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
      await loginRequest(userParam)
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

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </AuthContext.Provider>
  )
}