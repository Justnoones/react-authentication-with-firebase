import { createContext, useReducer } from "react";


const ThemeContext = createContext();

let ContextReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_CONTEXT" :
            return {
                ...state,
                theme : action.payload
            }
        default :
        return state;
    }
}

let ThemeContextProvider = ({children}) => {

    let [ state, dispath ] = useReducer(ContextReducer, {
        theme: "light"
    });

    let changeContext = (value) => {
        dispath({
            type: "CHANGE_CONTEXT",
            payload: value
        });
    };

    let isDark = state.theme === "dark";

    return (
        <ThemeContext.Provider value={{ changeContext , isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider };