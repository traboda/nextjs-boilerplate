import React from 'react';
import Router from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
// order is important
import 'chaya-ui/dist/style.css';
import '../src/styles/style.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function TrabodaWebApp({ Component, pageProps }: AppProps) {
  NProgress.configure({ showSpinner: false });

  return (
      <>
          <Head>
              <meta
                  name="viewport"
                  content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1"
              />
          </Head>
          <Component {...pageProps} />
      </>
  );
}