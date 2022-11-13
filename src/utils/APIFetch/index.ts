import GraphQLFetch from './fetch';

type APIFetch = {
    query: string
    variables?: {}
    endpoint?: string
    xff?: string,
    req?: {}
};

const APIFetch = async ({ query, variables, req }: APIFetch) =>
await GraphQLFetch({ query, variables, req })
.then((resp) => {
    if(resp?.error)
        console.error(resp.error);
    return {
        success: !(resp?.error && resp?.error?.length > 0),
        data: resp?.data,
        response: resp,
        error: resp?.error || null,
        errors: [resp?.error] || []
    };
});

export default APIFetch;
