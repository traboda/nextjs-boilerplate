import {ParsedUrlQuery} from 'querystring';

import { createContext } from 'react';
import {ProfileContextType} from "../../utils/types";


export type PrefetchContext = {
    profile: ProfileContextType,
    setProfile: (profile: ProfileContextType) => void,
    data: Partial<any|object>,
    setData: (data: Partial<any|object>) => void,
    query: ParsedUrlQuery,
    reload: () => void,
};

const PrefetchContext = createContext<PrefetchContext>({
    profile: null,
    setProfile: () => {},
    data: null,
    setData: () => {},
    query: null,
    reload: () => {},
});

export default PrefetchContext;