import React from 'react';

import LoginPage from '../src/auth/login';
import ServerFetcher from '../src/utils/server-fetcher';
import { withPageContext } from '../src/utils';


export const getServerSideProps = (ssr) => ServerFetcher({
  ssr,
  redirectMiddleware: (data) => {
    if(data?.profile?.id) {
      return {
        destination: ssr?.query?.redirect ? ssr?.query?.redirect.toString() : '/dashboard',
        permanent: false,
      };
    }
  },
});

export default withPageContext(() => <LoginPage />, {
  meta: () => {
    return {
      title: 'Login | NextJS Boilerplate',
    };
  },
  minimal: true,
});