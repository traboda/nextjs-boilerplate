import React from 'react';

import LandingPage from '../src/landing';

// export const getServerSideProps = (ssr) => ServerFetcher({
//   ssr,
// });

export default function () {
    return <LandingPage />;
}

// export default withPageContext(() => <LandingPage />, {
//   meta: () => {
//     return {
//       title: 'NextJS Boilerplate',
//     };
//   },
//   minimal: true,
// });