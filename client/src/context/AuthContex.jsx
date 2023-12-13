import { createContext, useContext, useState } from 'react'

import { registerRequest } from '../api/auth'

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

  return (
    <AuthContext.Provider value={{
      signUp,
      user,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  )
}