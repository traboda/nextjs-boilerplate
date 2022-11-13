import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';
const prefetchEndpoint = process.env.PREFETCH_SERVER_ENDPOINT || graphQLEndpoint;

const errorCodeStatuses = {
    400: { code: 'BAD_REQUEST', label: 'Bad Request (400)' },
    401: { code: 'UNAUTHORIZED', label: 'Not Authorized (401)' },
    404: { code: 'NOT_FOUND', label: 'Not Found (404)' },
    500: { code: 'INTERNAL_SERVER_ERROR', label: 'Internal Server Error (500)' },
    502: { code: 'BAD_GATEWAY', label: 'Bad Gateway (502)' },
    503: { code: 'SERVICE_UNAVAILABLE', label: 'Service unavailable (503)' },
    504: { code: 'GATEWAY_TIMEOUT', label: 'Gateway Timeout (504)' },
};

type Fetch = {
    query: string,
    variables?: {},
    endpoint?: string,
    req?: any
};

const GraphQLFetch = async ({ query, endpoint, variables, req }: Fetch) => {
    const APIConfig = {
        method: 'POST', credentials: 'include', headers: {},
        body: JSON.stringify({ query, variables: variables || null }),
    };
    APIConfig['headers'] = req ? {
        'cookie': req?.headers['cookie'],
        'user-agent': req?.headers['user-agent'],
    } : {};
    if(req) {
        const { get_ip_from_req } = require('./ip');
        APIConfig['headers']['X-Origin-IP'] = get_ip_from_req(req);
    }
    APIConfig['headers']['Content-Type'] = 'application/json';
    const _endpoint = endpoint ? endpoint : req ? prefetchEndpoint : graphQLEndpoint;
    return await fetch(_endpoint, APIConfig).then((response) => {
            const contentType = response.headers.get('content-type');
            if(response.ok && contentType && contentType.indexOf('application/json') !== -1)
                return response.json();
            throw response;
        }).catch((e) => {
            let errorObj = null;
            try { errorObj = errorCodeStatuses[e.status]; } catch (e) {
                errorObj = { code: 'UNKNOWN ERROR', message: 'Unknown Error - ' + e.status };
            }
            toast.error(
                <>
                    {errorObj?.code === 'BAD_GATEWAY' ?
                        'We are likely upgrading our servers, please check back after 30-60 seconds' :
                        'An error occurred when we tried connecting to our servers.'
                    }
                    <div style={{ fontFamily: 'monospace' }}>Response: {errorObj?.label}</div>
                </>,
                { position: toast.POSITION.BOTTOM_RIGHT, autoClose: false }
            );
            return {
                error: errorObj || { code: 'CONNECTIVITY_ERROR', message: 'Unable to Connect to Backend' },
                response: e,
            };
        });
};

export default GraphQLFetch;