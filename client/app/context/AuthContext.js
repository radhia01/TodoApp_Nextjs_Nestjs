// app/context/AuthContext.js
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState()

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    if (cookieToken) {
      setToken(cookieToken)
    }
  }, [])

  const login = (newToken,user) => {
    setToken(newToken)
    setUser(user)
  }

  const logout = () => {
    Cookies.remove("token")
    setToken(null)
    setUser(null)
  }
 

  return (
    <AuthContext.Provider value={{ token, login, logout ,user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
