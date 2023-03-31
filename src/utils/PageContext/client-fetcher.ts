import { NextApiRequestQuery } from 'next/dist/server/api-utils';

import APIFetch from '../APIFetch';
import buildQueryFromFetches from '../query-builder';
import { Fetch } from '../types';

type ClientFetcher = {
    fetches: Fetch[],
    query?: NextApiRequestQuery
};

const ClientFetcher = async ({ fetches, query: _query }: ClientFetcher) => {
    const { query, variables } = buildQueryFromFetches(fetches, _query);

    return APIFetch({
        query,
        variables,
    }).then(({ errors, data }) => {
        const d = {} as { [key: string]: any };
        if (fetches?.length > 0)
            fetches.forEach((f) => {
                d[f.key] = data?.hasOwnProperty(f.key) ? data[f.key] : null;
            });
        return {
            ...d,
            errors: errors ? errors : null,
        } as {
            [key: string]: any
            errors: any
        };
    });
};

export default ClientFetcher;