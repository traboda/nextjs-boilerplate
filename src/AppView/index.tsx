import React, { useEffect, useState } from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { DSRContextProvider } from 'chaya-ui';
import styled from '@emotion/styled';
import Link from 'next/link';

import Icon from '../shared/Icon';

import ThemeContext, { AppThemeType } from './contexts/theme';
import ToasterContainer from './toaster';
import AppViewHeadTags, { PageMeta } from './head';
import AppContext from './contexts/app';

const ViewContainer = styled('div')`
  background: ${({ theme }) => theme.backgroundDark};
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  transition: all 250ms ease;
  
  .bg-theme {
      background: ${({ theme }) => theme.background};
  }
  
  .bg-theme-dark {
      background: ${({ theme }) => theme.backgroundDark};
  }
`;

const MainContainer = styled('div')`
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding: 75px 0 0;
  max-height: 100vh;
  height: 100%;
`;

const defaultTheme: AppThemeType = {
  primary: '#5e81f4',
  primaryTextColor: 'white',
  secondary: '#FBB03B',
  secondaryTextColor: '#FBB03B',
  color: '#242338',
  background: '#fefefe',
  backgroundDark: '#f5f5fa',
};

const darkTheme: AppThemeType = {
  primary: '#28AF1E',
  primaryTextColor: 'white',
  secondary: '#3564dc',
  secondaryTextColor: '#EEE',
  color: '#eee',
  backgroundDark: '#212529',
  background: '#36393D',
};

type AppView = {
  children: (React.ReactElement | React.ReactNode),
  meta?: PageMeta,
  minimal?: boolean,
};

const AppView = ({ meta, minimal = false, children }: AppView) => {
    
  const [isDarkTheme, _setDarkTheme] = useState<boolean>(true);
  const [_meta, setMeta] = useState(meta);

  const graphQLClient = new GraphQLClient({ url: '/api/graphql/' });

  const setDarkTheme = (isDark: boolean) => {
    _setDarkTheme(isDark);
    if(isDark) localStorage.removeItem('ThemePref');
    else localStorage.ThemePref = 'light';
  };

  useEffect(() => {
    if(localStorage.ThemePref)
      _setDarkTheme(false);
  }, []);

  return (
      <DSRContextProvider
          theme={isDarkTheme ? darkTheme : defaultTheme}
          iconWrapper={(icon, props) => ({
            'chevron-down': <Icon icon="chevron-down" {...props} />,
          })[icon] ?? <Icon icon={icon} {...props} />}
          linkWrapper={(link, component) => (
              <Link href={link} passHref legacyBehavior>
                  {component}
              </Link>
          )}
      >
          <ThemeContext theme={isDarkTheme ? darkTheme : defaultTheme}>
              <ClientContext.Provider value={graphQLClient}>
                  <AppContext.Provider
                      value={{
                        isDarkTheme, setDarkTheme,
                        meta: _meta, setMeta,
                      }}
                  >
                      <AppViewHeadTags meta={_meta} />
                      <ViewContainer className={`view-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                          {/*Add topbar here*/}

                          <MainContainer className={minimal && '!p-0'}>
                              {children}
                          </MainContainer>
                      </ViewContainer>
                      <ToasterContainer />
                  </AppContext.Provider>
              </ClientContext.Provider>
          </ThemeContext>
      </DSRContextProvider>
  );

};

export default AppView;