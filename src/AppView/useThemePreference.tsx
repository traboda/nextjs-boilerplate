import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { APIFetch } from '../utils';


type useThemePreference = {
  isLoggedIn?: boolean,
  preferDarkTheme?: boolean,
  defaultTheme?: ('SYSTEM' | 'DARK' | 'LIGHT')
};

const useThemePreference = ({ isLoggedIn = false, preferDarkTheme = null, defaultTheme = 'SYSTEM' }: useThemePreference) => {
  const [isDarkTheme, _setDarkTheme] = useState(preferDarkTheme !== null ? preferDarkTheme : defaultTheme === 'DARK');

  useEffect(() => {
    if(defaultTheme === 'SYSTEM') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        _setDarkTheme(event.matches);
      });
    }
  }, []);

  const setDarkTheme = (isDarkTheme) => {
    if(isLoggedIn) {
      APIFetch({
        query: `mutation ($preferDarkTheme: Boolean){
                  editProfile(user: { preferDarkTheme: $preferDarkTheme }){
                    preferDarkTheme
                  }
                }`,
        variables: {
          preferDarkTheme: isDarkTheme,
        },
      }).then(({ success, data, error }) => {
        if(!success || error || data?.editProfile?.preferDarkTheme !== isDarkTheme) {
          toast.error('Failed to update theme preference');
        } else {
          _setDarkTheme(isDarkTheme);
        }
      });
    } else {
      _setDarkTheme(isDarkTheme);
    }
  };

  return [isDarkTheme, setDarkTheme] as const;

};

export default useThemePreference;