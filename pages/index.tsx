import React from 'react';

import ServerFetcher from '../src/utils/server-fetcher';
import LandingPage from '../src/landing';
import { withPageContext } from '../src/utils';

export const getServerSideProps = (ssr) => ServerFetcher({
  ssr,
});

export default withPageContext(() => <LandingPage />, {
  meta: () => {
    return {
      title: 'NextJS Boilerplate',
    };
  },
  minimal: true,
});