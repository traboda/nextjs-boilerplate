import { createContext } from 'react';

type AppContextType = {
  isDarkTheme: boolean,
  setDarkTheme: (dark: boolean) => void,
  meta: any,
  setMeta: (meta: any) => void,
  logout: () => void,
};

const AppContext = createContext<Partial<AppContextType>>({});

export default AppContext;