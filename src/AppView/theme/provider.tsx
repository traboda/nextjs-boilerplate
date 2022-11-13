import React, {useEffect, useState} from "react";

import {Global, ThemeContext} from "@emotion/react";
import useThemeDetector from "./useThemeDetector";

const DARK_THEME = {
    isDarkTheme: true,
    color: '#fff',
    background: '#333',
    primary: '#fff',
    primaryTextColor: '#000',
};

const LIGHT_THEME = {
    isDarkTheme: false,
    color: '#000',
    background: '#fff'
};

const ThemeProvider = ({ children }) => {

    const isDark = useThemeDetector();
    const [isDarkTheme, setDarkTheme] = useState(isDark);

    useEffect(() => { setDarkTheme(isDark) }, [isDark]);

    return (
        <ThemeContext.Provider value={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
            <Global
                styles={{
                    body: {
                        color: isDarkTheme ? DARK_THEME.color : LIGHT_THEME.color,
                        background: isDarkTheme ? DARK_THEME.background : LIGHT_THEME.background
                    }
                }}
            />
            {children}
        </ThemeContext.Provider>
    );

};

export default ThemeProvider;