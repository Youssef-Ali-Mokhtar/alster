import { themeContext } from "./theme-context";
import { useState } from "react";

const ThemeProvider = ({ children }) => {
    const theme = localStorage.getItem('theme')
    const [themeSwitch, setThemeSwitch] = useState(theme?theme:'light');

    const themeSwitchHandler = ()=> {
        setThemeSwitch(prev=>{
            const theme = prev==='light'?'dark':'light'
            localStorage.setItem('theme', theme)
            return theme;
        });
    }

    const contextValue={
        theme: themeSwitch,
        themeHandler: themeSwitchHandler
    }

    return ( <themeContext.Provider value={ contextValue }>
        {children}
    </themeContext.Provider> );
}
 
export default ThemeProvider;