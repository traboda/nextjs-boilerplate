import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NotFoundView from '../src/shared/NotFoundView';
import { APIFetch, withPageContext } from '../src/utils';
import buildQueryFromFetches from '../src/utils/query-builder';
import { ProfileFetchConfig } from '../src/utils/fetch-configs';
import { ProfileContextType } from '../src/utils/PageContext/context';

const NotFoundPage = () => (
    <NotFoundView
        title="Page Not Found"
        text="
            We could not fetch this page you were looking for. It might because you are
            visiting a wrong address, or the page here was moved or deleted.
        "
    />
);

const pageProvider = withPageContext(NotFoundPage, { fetches: [], meta: () => ({ title: 'Page Not Found' }) });

const Page = () => {

  const router = useRouter();

  const [data, setData] = useState<{
    profile: ProfileContextType,
  } | null>(null);
  const _fetches = [ProfileFetchConfig];
  const { query, variables } = buildQueryFromFetches(_fetches);
  const fetch = () => {
    APIFetch<{ profile: ProfileContextType }>({
      query,
      variables,
    }).then(({ data, success }) => {
      if(success && data) {
        setData(data);
      }
    });
  };

  useEffect(fetch, []);

  return data ? pageProvider({
    profile: data?.profile,
    query: null,
    setData,
    data,
    locale: router.locale,
  }) : <NotFoundPage />;
};

export default Page;
