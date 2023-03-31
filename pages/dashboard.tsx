import React from 'react';
import { GetServerSideProps } from 'next';

import ServerFetcher from '../src/utils/server-fetcher';
import DashboardPage from '../src/dashboard';
import { withPageContext } from '../src/utils';

export const getServerSideProps: GetServerSideProps = (ssr) => ServerFetcher({
    ssr,
    redirectMiddleware: (data) => {
        if (!data?.profile?.id) {
            return {
                destination: '/login',
                permanent: false,
            };
        }
    },
});

export default withPageContext(() => <DashboardPage />, {
    meta: () => {
        return {
            title: 'Dashboard | NextJS Boilerplate',
        };
    },
    minimal: true,
});