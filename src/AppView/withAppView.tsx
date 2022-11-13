import React from 'react';

import {FetcherQuery} from "../utils/types";

import ThemeProvider from "./theme/provider";
import PrefetchProvider from "./prefetch/provider";
import {PageContextChildrenProps} from "./types";
import AppViewHeadTags, {PageMeta} from "./head";
import AppView from './view';

export type PageContextOptions = {
    fetches?: FetcherQuery[],
    loginRequired?: boolean,
    meta?: (PageContextChildrenProps) => PageMeta,
    redirectMiddleware?: (PageContextChildrenProps) => { destination: string, permanent: boolean },
    minimal?: boolean,
};

const withAppView = (
    Component: React.FunctionComponent<Partial<PageContextChildrenProps>>,
    options: PageContextOptions = { fetches: null, loginRequired: false, redirectMiddleware: null, meta: null }
) => ({ profile, properties, query, ...data }) => {

    const { fetches, loginRequired, meta, minimal, redirectMiddleware } = options;

    return (
        <PrefetchProvider
            fetches={fetches}
            profile={profile}
            data={data}
            query={query}
            loginRequired={loginRequired}
            redirectMiddleware={redirectMiddleware}
        >{(props) => (
            <ThemeProvider>
                <AppViewHeadTags meta={meta(props)} />
                <AppView minimal={minimal}>
                    <Component {...props} />
                </AppView>
            </ThemeProvider>
        )}</PrefetchProvider>
    );

};

export default withAppView;