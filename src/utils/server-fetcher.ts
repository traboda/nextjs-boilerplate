import { IncomingMessage, ServerResponse } from 'http';

import { NextApiRequestQuery } from 'next/dist/server/api-utils';

import APIFetch from '../utils/APIFetch';

import { Fetch, PageBasicData } from './types';
import buildQueryFromFetches from './query-builder';
import { ProfileFetchConfig } from './fetch-configs';

type RedirectType = {
    destination: string,
    permanent: boolean
};

type ServerFetcher = {
    fetches?: Fetch[],
    ssr: any & {
        req: IncomingMessage,
        res: ServerResponse,
        query: NextApiRequestQuery,
        locale: string
    },
    excludeDefaultFetches?: boolean,
    loginRequired?: boolean,
    responseMiddleware?: ((data: any, res: ServerResponse) => void) | null,
    redirectMiddleware?: ((data: any, query: NextApiRequestQuery) => (RedirectType | void)) | null,
    notFoundMiddleware?: ((data: any, query: NextApiRequestQuery) => boolean) | null,
};

const ServerFetcher = async ({
    fetches, ssr, loginRequired = false, excludeDefaultFetches = false,
    responseMiddleware = null, redirectMiddleware = null, notFoundMiddleware = null,
}: ServerFetcher) => {

    let _fetches = excludeDefaultFetches ? [] : [ProfileFetchConfig];
    _fetches = _fetches.concat(fetches || []);

    const { query, variables } = buildQueryFromFetches(_fetches, ssr.query);

    return APIFetch({
        query,
        variables,
        req: ssr.req,
    }).then(({ data, error }) => {
        if (error) return { notFound: true, props: {} };
        const d = <PageBasicData>{};
        if (_fetches?.length > 0)
            _fetches.forEach((f) => {
                d[f.key as keyof PageBasicData] = data?.hasOwnProperty(f.key) ? data[f.key] : null;
            });
        if (loginRequired)
            if (!(d?.profile?.id))
                return {
                    redirect: {
                        destination: `/login?redirect=${ssr.req.url}`,
                        permanent: false,
                    },
                };
        if (notFoundMiddleware !== null) {
            const notFound: boolean = notFoundMiddleware(data, ssr.query);
            if (notFound) return { notFound: true, props: {} };
        }
        if (responseMiddleware !== null)
            responseMiddleware(d, ssr.res);
        if (redirectMiddleware !== null) {
            const obj = redirectMiddleware(d, ssr.query);
            if (obj) return { redirect: obj };
        }
        return {
            props: {
                ...d,
                query: ssr?.query,
                error: error,
                locale: ssr?.locale,
                errors: error ? [error] : [],
            },
        };
    });
};

export default ServerFetcher;