import React, { useEffect } from 'react'
import { createContext, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

let AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN" :
      return {...state, user: action.payload}
    case "LOG_OUT" :
      return {...state, user: null}
      case "AUTH_READY" :
        return {...state, authReady: true}
    default :
      return state
  }
}

export default function AuthContextProvider({children}) {

  let [state, dispath] = useReducer(AuthReducer, {user : null, authReady: false});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispath({type: "AUTH_READY"});
      if (user) {
        dispath({
          type: "LOG_IN",
          payload: user
        })
      } else {
        dispath({
          type: "LOG_OUT"
        })
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };