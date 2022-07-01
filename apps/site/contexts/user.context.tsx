import React, { useState, createContext } from 'react'

interface User {
  id: string;
  name: string;
}

interface UserContextProps {
  isLoggedIn: boolean
  user: User
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: User) => void
}

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => 1,
  setUser: () => 1,
  user: null
});

export const UserContextProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState(null);

  return (
    <UserContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>{children}</UserContext.Provider>
  )
}