import fetch from 'isomorphic-fetch';
import toast from 'react-hot-toast';

import { getIPFromRequest } from './ip';

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';
const prefetchEndpoint = process.env.PREFETCH_SERVER_ENDPOINT || graphQLEndpoint;

const ERROR_CODE_STATUSES: {
  [key: number]: { code: string, label: string }
} = {
  400: { code: 'BAD_REQUEST', label: 'Bad Request (400)' },
  401: { code: 'UNAUTHORIZED', label: 'Not Authorized (401)' },
  404: { code: 'NOT_FOUND', label: 'Not Found (404)' },
  500: { code: 'INTERNAL_SERVER_ERROR', label: 'Internal Server Error (500)' },
  502: { code: 'BAD_GATEWAY', label: 'Bad Gateway (502)' },
  503: { code: 'SERVICE_UNAVAILABLE', label: 'Service unavailable (503)' },
  504: { code: 'GATEWAY_TIMEOUT', label: 'Gateway Timeout (504)' },
};

type GraphQLFetch = {
  query: string,
  variables?: {},
  endpoint?: string,
  req?: any
};

type APIConfigType = {
  method: 'POST' | 'GET',
  credentials: 'include',
  headers: {
    'Content-Type'?: string,
    'user-agent'?: string,
    'cookie'?: string,
    'X-Origin-IP'?: string,
  },
  body?: string,
};

const GraphQLFetch = async ({ query, endpoint, variables, req }: GraphQLFetch) => {
  const APIConfig = {
    method: 'POST', credentials: 'include', headers: {},
    body: JSON.stringify({ query, variables: variables || null }),
  } as APIConfigType;
  APIConfig.headers = req ? {
    'cookie': req?.headers.cookie,
    'user-agent': req?.headers['user-agent'],
  } : {};
  if(req) {
    APIConfig.headers['X-Origin-IP'] = getIPFromRequest(req);
  }
  APIConfig.headers['Content-Type'] = 'application/json';
  const _endpoint = endpoint ? endpoint : req ? prefetchEndpoint : graphQLEndpoint;
  return fetch(_endpoint, APIConfig).then((response) => {
    const contentType = response.headers.get('content-type');
    if(response.ok && contentType && contentType.indexOf('application/json') !== -1)
      return response.json();
  }).catch((e) => {
    let errorObj;
    try { errorObj = ERROR_CODE_STATUSES[e.status]; } catch (ex) {
      errorObj = { code: 'UNKNOWN ERROR', message: 'Unknown Error - ' + e.status };
    }
    toast.error(
        <div>
            <div>
                <div>
                    {errorObj?.code === 'BAD_GATEWAY' ?
                      'We are likely upgrading our servers, please check back after 30-60 seconds' :
                      'An error occurred when we tried connecting to our servers.'
                        }
                </div>
                <div style={{ fontFamily: 'monospace' }}>
                    Response:
                    {errorObj?.label}
                </div>
            </div>
        </div>,
    );
    return {
      error: errorObj || { code: 'CONNECTIVITY_ERROR', message: 'Unable to Connect to Backend' },
      response: e,
    };
  });
};

export default GraphQLFetch;