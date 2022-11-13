import { ParsedUrlQuery } from 'querystring';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import { PageContextChildrenProps } from "../types";
import ClientFetcher from "../../utils/client-fetcher";

import {FetcherQuery, ProfileContextType} from "../../utils/types";
import PrefetchContext from './context';

type PrefetchProviderType = {
    loginRequired?: boolean,
    data?: any,
    fetches?: FetcherQuery[],
    query?: ParsedUrlQuery,
    profile?: ProfileContextType,
    redirectMiddleware?: (PageContextChildrenProps) => { destination: string, permanent: boolean },
    children?: ((data: Partial<PageContextChildrenProps>) => React.ReactElement)
}

const PrefetchProvider = ({
    profile: _profile = null, data: _data, query = null,
    loginRequired = false, fetches = [], redirectMiddleware = null,
    children
}: PrefetchProviderType) => {

    const [profile, setProfile] = useState<ProfileContextType>(_profile);
    const [data, setData] = useState(_data);
    const router = useRouter();

    const fetchData = () => {
        ClientFetcher({
            fetches,
            query
        }).then(({ profile, errors, ...data }) => {
            setData(data);
            setProfile(profile);
        });
    };

    useEffect(() => {
        if(loginRequired && profile === null) {
            router.push(`/login/?redirect=${router.asPath}`);
        }
        if(profile?.id === null) {
            fetchData();
        }

        if(redirectMiddleware && typeof redirectMiddleware === 'function') {
            const redirect = redirectMiddleware({ profile, data, query });
            if(redirect) {
                router.push(redirect.destination, redirect.destination, { shallow: redirect.permanent });
            }
        }

    }, [profile]);

    return (
        <PrefetchContext.Provider value={{ profile, setProfile, data, setData, query, reload: fetchData }}>
            {children({ data, profile, setProfile, setData, query })}
        </PrefetchContext.Provider>
    );

};

export default PrefetchProvider;
