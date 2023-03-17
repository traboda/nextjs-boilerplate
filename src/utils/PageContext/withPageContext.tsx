import React from 'react';

import { Fetch } from '../types';
import AppView from '../../AppView';
import { PageMeta } from '../../AppView/head';

import ContextProvider, { PageContextChildrenProps } from './provider';

type PageContextOptions = {
  fetches?: Fetch[],
  loginRequired?: boolean,
  meta: (args: PageContextChildrenProps) => PageMeta,
  minimal?: boolean,
};

const withPageContext = (
  Component: React.FunctionComponent<Partial<PageContextChildrenProps>>,
  options: PageContextOptions = {
    fetches: [],
    loginRequired: false,
    meta: (_) => { return {}; },
  },
) => ({ profile, query, locale, ...data }: PageContextChildrenProps) => {
  const { fetches, loginRequired, meta, minimal } = options;
  return (
      <ContextProvider
          fetches={fetches}
          profile={profile}
          data={data}
          query={query}
          loginRequired={loginRequired}
          locale={locale}
      >
          {(props) => (
              <AppView minimal={minimal} meta={meta(props)}>
                  <Component {...props} />
              </AppView>
          )}
      </ContextProvider>
  );
};

export default withPageContext;