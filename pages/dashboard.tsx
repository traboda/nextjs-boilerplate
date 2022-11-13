import React from "react";

import ServerFetcher from "../src/utils/server-fetcher";
import withAppView from "../src/AppView/withAppView";
import DashboardPage from "../src/dashboard";

export const getServerSideProps = (ssr) => ServerFetcher({
    ssr,
    redirectMiddleware: (data) => {
        if(!data?.profile?.id){
            return {
                destination: '/login',
                permanent: false
            };
        }
    },
});

export default withAppView(() => <DashboardPage />, {
    meta: (data) => {
        return {
            title: `Dashboard | NextJS Boilerplate`
        };
    },
    redirectMiddleware: (data) => {
        if(!data?.profile?.id){
            return {
                destination: '/login',
                permanent: false
            };
        }
    },
    minimal: true,
});