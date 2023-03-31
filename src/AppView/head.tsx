import React from 'react';
import Head from 'next/head';


export type PageMeta = {
    title?: string,
    icon?: string,
    customTitle?: string,
    description?: string,
    noIndex?: boolean,
    image?: string,
    author?: string,
    isProfile?: boolean
};

type AppViewHeadTags = {
    meta?: PageMeta
};

const AppViewHeadTags = ({ meta }: AppViewHeadTags) => {

    const title = meta?.customTitle
        ? meta.customTitle
        : `${meta && meta.title ? `${meta.title} |` : ''} NextJS Boilerplate Template`;

    return (
        <Head>
            <title>{title}</title>
            {meta?.isProfile && <meta name="og:type" content="profile" />}
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />
            <meta name="description" content={meta?.description} />
            {meta?.author && <meta name="author" content={meta?.author} />}
            {meta?.noIndex && <meta name="robots" content="noindex" />}
            {meta?.image && <meta property="og:image" content={meta.image} />}
        </Head>
    );
};

export default AppViewHeadTags;