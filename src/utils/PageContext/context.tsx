import { createContext } from 'react';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';

export type ProfileContextType = {
    id: string,
    name: string,
    username: string,
};

type PrefetchContext = {
    profile: ProfileContextType | null,
    setProfile: (profile: ProfileContextType | null) => void,
    data: Partial<any | object> | null,
    setData: (data: Partial<any | object>) => void,
    query?: NextApiRequestQuery,
    reload: () => void,
    locale: string,
};

const PrefetchContext = createContext<PrefetchContext>({
    profile: null,
    setProfile: (_) => {},
    data: null,
    setData: () => {},
    reload: () => {},
    locale: 'en-US',
});

export default PrefetchContext;
