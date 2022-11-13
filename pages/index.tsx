import React from "react";

import ServerFetcher from "../src/utils/server-fetcher";
import { withAppView } from "../src/AppView";
import LandingPage from "../src/landing";

export const getServerSideProps = (ssr) => ServerFetcher({
    ssr,
});

export default withAppView(() => <LandingPage />, {
    meta: (data) => {
        return {
            title: `NextJS Boilerplate`
        };
    },
    minimal: true,
});