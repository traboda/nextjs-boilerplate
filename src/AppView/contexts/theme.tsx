import React from 'react';
import { css, Global, ThemeProvider } from '@emotion/react';
import Color from 'color';

export type AppThemeType = {
  isDarkTheme?: boolean,
  primary: string
  primaryTextColor: string
  secondary: string
  secondaryTextColor: string
  text?: string
  color: string,
  background: string,
  backgroundDark?: string
};


const ThemeContext = ({ children, theme, isDarkTheme = false }) => {

  const _theme = isDarkTheme ? { isDarkTheme: true, ...theme } : { ...theme };
  _theme.color = _theme.text;
  _theme.backgroundDark = Color(_theme.background).darken(0.3).hex();

  const generateTheme = () => {
    _theme.primaryTextColor = Color(_theme.primary).isDark() ? 'white' : 'black';
    _theme.secondaryTextColor = Color(_theme.secondary).isDark() ? 'white' : 'black';
    return _theme;
  };

  const generateCSSTheme = () => {
    const cssTheme = {};
    cssTheme['--theme-primary'] = _theme.primary;
    cssTheme['--theme-secondary'] = _theme.secondary;
    cssTheme['--theme-color'] = _theme.color;
    cssTheme['--theme-background'] = _theme.background;
    cssTheme['.bgPrimary'] = _theme.primary;
    return cssTheme;
  };

  return (
      <ThemeProvider theme={generateTheme()}>
          <Global styles={css`${generateCSSTheme()}`} />
          {children}
      </ThemeProvider>
  );
};

export default ThemeContext;