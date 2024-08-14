import React, { createContext, useState } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider= ({children}) => {
    const [theme, setTheme] = useState('light'); // Default to 'light'

    const darkMode = () => setTheme('dark');
    const lightMode = () => setTheme('light');
    console.log(theme);
    return (
        <ThemeContext.Provider value={{theme, darkMode, lightMode}}>
            {children}
        </ThemeContext.Provider>
    )
}