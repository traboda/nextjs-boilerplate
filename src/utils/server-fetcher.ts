import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';

import APIFetch from '../utils/APIFetch';

import build_query_from_fetches from './query-builder';
import ProfileFetchConfig from "./fetches/profile";
import {FetcherQuery, ProfileContextType} from "./types";

type RedirectType = {
    destination: string,
    permanent: boolean
}

type PageBasicData = {
    profile: ProfileContextType
}

type ServerFetcher = {
    fetches?: FetcherQuery[],
    ssr: {
        req: IncomingMessage,
        res: ServerResponse,
        query: ParsedUrlQuery
    },
    excludeDefaultFetches?: boolean,
    loginRequired?: boolean,
    responseMiddleware?: (data: any, res: ServerResponse) => void,
    redirectMiddleware?: (data, query: ParsedUrlQuery) => (RedirectType|void),
    notFoundMiddleware?: (data, query: ParsedUrlQuery) => boolean,
};

const ServerFetcher = async ({
    fetches, ssr, loginRequired = false, excludeDefaultFetches = false,
    responseMiddleware = null, redirectMiddleware = null, notFoundMiddleware = null
}: ServerFetcher) => {

    let _fetches = excludeDefaultFetches ? [] : [ProfileFetchConfig,];
    _fetches = _fetches.concat(fetches || []);

    const { query, variables } = build_query_from_fetches(_fetches, ssr.query);

    return await APIFetch({
        query,
        variables,
        req: ssr.req,
    }).then(({ data, error }) => {
        const d = <Partial<PageBasicData>>{};
        if(_fetches?.length > 0)
            _fetches.forEach((f) => {
                d[f.key] = data?.hasOwnProperty(f.key) ? data[f.key] : null;
            });
        if(loginRequired)
            if(!(d?.profile?.id))
                return {
                    redirect: {
                        destination: `/login?redirect=${ssr.req.url}`,
                        permanent: false
                    }
                };
        if(notFoundMiddleware !== null) {
            const notFound: boolean = notFoundMiddleware(data, ssr.query);
            if(notFound) return { notFound: true, props: {} };
        }
        if(responseMiddleware !== null)
            responseMiddleware(d, ssr.res);
        if(redirectMiddleware !== null){
            const obj = redirectMiddleware(d, ssr.query);
            if(obj)
                return { redirect: obj };
        }
        return {
            props: {
                ...d,
                query: ssr?.query,
                error: error,
                errors: error ? [error] : []
            }
        };
    });
};

export default ServerFetcher;