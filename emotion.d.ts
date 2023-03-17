export {};

declare module '@emotion/react' {
  interface Theme {
    isDarkTheme?: boolean,
    primary: string
    primaryTextColor: string
    secondary: string
    secondaryTextColor: string
    color: string
    background: string
    backgroundDark: string,
    fontFamily: string
  }
}