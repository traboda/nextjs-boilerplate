import { ParsedUrlQuery } from 'querystring';

import {FetcherQuery, ProfileContextType} from "./types";
import APIFetch from "./APIFetch";

import build_query_from_fetches from "./query-builder";
import ProfileFetchConfig from "./fetches/profile";

type ClientFetcher = {
    fetches: FetcherQuery[],
    query: ParsedUrlQuery,
    excludeDefaultFetches?: boolean
};

type ClientFetcherResponse = {
    error?: any,
    profile?: ProfileContextType,
    [key: string]: any
}

const ClientFetcher = async ({ fetches, query: _query, excludeDefaultFetches = false }: ClientFetcher) : Promise<ClientFetcherResponse> => {

    let _fetches = excludeDefaultFetches ? [] : [ProfileFetchConfig,];
    _fetches = _fetches.concat(fetches || []);

    const { query, variables } = build_query_from_fetches(_fetches, _query);

    return await APIFetch({
        query,
        variables,
    }).then(({ error, data }) => {
        const d = {};
        if(fetches?.length > 0)
            fetches.forEach((f) => {
                d[f.key] = data?.hasOwnProperty(f.key) ? data[f.key] : null;
            });
        return {
            ...d,
            error: error ? error : null,
        };
    });

};

export default ClientFetcher;