import React from "react";

import LoginPage from "../src/auth/login";
import ServerFetcher from "../src/utils/server-fetcher";
import withAppView from "../src/AppView/withAppView";


export const getServerSideProps = (ssr) => ServerFetcher({
    ssr,
    redirectMiddleware: (data) => {
        if(data?.profile?.id){
            return {
                destination: ssr?.query?.redirect ? ssr?.query?.redirect.toString() : '/dashboard',
                permanent: false
            };
        }
    },
});

export default withAppView(() => <LoginPage />, {
    meta: (data) => {
        return {
            title: `Login | NextJS Boilerplate`
        };
    },
    redirectMiddleware: (data) => {
        if(data?.profile?.id){
            return {
                destination: '/dashboard',
                permanent: false
            };
        }
    },
    minimal: true,
});