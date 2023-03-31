import { useEffect, useState } from 'react';

import APIFetch from './APIFetch';

type QueryListLocatorFn = (data: object) => object[];
type FacetHandlerFn = null | ((data: object, oldData: (object | null)) => object);

const useCursorQueryFetch = (
    initialData: object[], query: string, name: string, listLocator: QueryListLocatorFn,
    variables: object | null = null, facetHandler: FacetHandlerFn = null,
) => {

    const [data, setData] = useState<object[]>([]);
    const [_variables, setVariables] = useState(variables);
    const [hasNext, setHasNext] = useState(true);
    const [totalCount, setTotalCount] = useState(null);
    const [lastCursor, setLastCursor] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [facets, setFacets] = useState<object | null>(null);

    const fetch = () => {
        setData([]);
        setLoading(true);
        APIFetch({
            query: query,
            variables: {
                ...variables,
                after: null,
            },
        }).then(({ data: d, success }) => {
            setLoading(false);
            if (success && d && d[name]) {
                setData(listLocator(d));
                setHasNext(d[name].hasNext);
                setTotalCount(d[name].totalCount);
                setLastCursor(d[name].lastCursor);
                if (facetHandler)
                    setFacets(facetHandler(d[name]?.facets, facets));
            }
        });
    };

    const loadMore = () => {
        if (hasNext && data?.length > 0) {
            setLoading(true);
            APIFetch({
                query: query,
                variables: {
                    ...variables,
                    after: lastCursor,
                },
            }).then(({ data: d, success }) => {
                setLoading(false);

                const _d = (d && name.split('.').length > 1) ?
                    name?.split('.')?.reduce((obj, key) => obj[key], d) : d[name];

                if (success) {
                    setData([...data, ...listLocator(d)]);
                    setHasNext(_d.hasNext);
                    setTotalCount(_d.totalCount);
                    setLastCursor(_d.lastCursor);
                }
            });
        }
    };

    useEffect(() => {
        if (initialData) setData(initialData);
        else fetch();
    }, []);

    useEffect(() => {
        if (JSON.stringify(variables) !== JSON.stringify(_variables)) {
            fetch();
            setVariables(variables);
        }
    }, [variables]);

    const reload = (variables = null) => {
        if (variables) setVariables(variables);
        else fetch();
    };

    return {
        data,
        hasNext,
        totalCount,
        loadMore,
        reload,
        isLoading,
        facets,
    } as const;

};

export default useCursorQueryFetch;