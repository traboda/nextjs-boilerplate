export type FetcherVariable = {
    key: string,
    value?: string,
    queryAttr?: string,
    type: string,
    required?: boolean
};

export type FetcherQuery = {
    query?: string,
    variables?: FetcherVariable[],
    key: string,
};


export type ProfileContextType = {
    id: string,
    name: string,
    username: string,
};