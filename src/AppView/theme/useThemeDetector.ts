import {useLayoutEffect, useState} from "react";

const useThemeDetector = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const mqListener = (e => {
        setIsDarkTheme(e.matches);
    });

    useLayoutEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mqListener);
        if (darkThemeMq.matches) {
            setIsDarkTheme(true);
        }
        return () => darkThemeMq.removeListener(mqListener);
    }, []);

    return isDarkTheme;
}

export default useThemeDetector;