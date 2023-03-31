import React, { useEffect, useState } from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { DSRContextProvider } from 'chaya-ui';
import Link from 'next/link';
import clsx from 'clsx';

import Icon from '../shared/Icon';
import cache from '../utils/cache';

import ToasterContainer from './toaster';
import AppViewHeadTags, { PageMeta } from './head';
import AppContext from './contexts/app';

export type AppThemeType = {
    primary: string
    primaryTextColor: string
    secondary: string
    secondaryTextColor: string
    color: string,
    background: string,
    backgroundDark?: string
};

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
        if (isDark) cache.remove('ThemePref');
        else cache.put('ThemePref', 'light');
    };

    useEffect(() => {
        if (cache.has('ThemePref')) _setDarkTheme(false);
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
            <ClientContext.Provider value={graphQLClient}>
                <AppContext.Provider
                    value={{
                        isDarkTheme,
                        setDarkTheme,
                        meta: _meta,
                        setMeta,
                    }}
                >
                    <AppViewHeadTags meta={_meta} />
                    <div
                        className={clsx([
                            'view-container bg-background text-color min-h-screen transition-all',
                            isDarkTheme ? 'dark-theme' : 'light-theme',
                        ])}
                    >
                        {/*Add topbar here*/}

                        <div className={clsx(['w-full overflow-auto pt-20 max-h-screen h-full', minimal && '!p-0'])}>
                            {children}
                        </div>
                    </div>
                    <ToasterContainer />
                </AppContext.Provider>
            </ClientContext.Provider>
        </DSRContextProvider>
    );

};

export default AppView;