import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';


const AppDocument = () => {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#1E259B" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta property="og:site_name" content="Traboda CyberLabs" />
                <meta property="og:locale" content="en_US" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap"
                    rel="stylesheet"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default AppDocument;