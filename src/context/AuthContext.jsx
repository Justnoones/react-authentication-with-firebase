import { createContext } from "react";

const AuthContext = createContext();

import React from 'react'

export default function AuthContextProvider({children}) {
  return (
    <AuthContext.Provider value={{user:"Wai Yan"}}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };