import GraphQLFetch from './fetch';

type APIFetch = {
    query: string
    variables?: {
        [key: string]: any
    }
    endpoint?: string
    xff?: string,
    req?: {}
};

const APIFetch = async <Type extends { [key: string]: any }>({
    query, variables, req,
}: APIFetch) => {
    return GraphQLFetch({ query, variables, req })
        .then((resp) => {
            if (resp?.error)
                console.error(resp.error);
            return {
                success: !(resp?.error && resp?.error?.length > 0),
                data: resp?.data,
                response: resp,
                error: resp?.error || null,
                errors: [resp?.error] || [],
            } as {
                success: boolean,
                data: Type,
                response: any,
                error: any,
                errors: any[],
            };
        });
};

export default APIFetch;
