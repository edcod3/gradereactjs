import React, { useState, useEffect } from "react"

//React context for color theme
const ThemeContext = React.createContext(undefined) 

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState("light")
    useEffect(() => {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(systemPrefersDark ? "dark" : "light")
    }, [])

    const setTheme = (name) => {
        document.body.setAttribute("data-theme", name) 
        setThemeName(name)
    }

    return (
        <ThemeContext.Provider value={{theme: themeName, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)