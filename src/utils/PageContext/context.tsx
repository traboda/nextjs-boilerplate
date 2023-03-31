import { ParsedUrlQuery } from 'querystring';

import { createContext } from 'react';

export type ProfileContextType = {
  id: string,
  name: string,
  username: string,
};

type PrefetchContext = {
  profile: ProfileContextType | null,
  setProfile: (profile: ProfileContextType) => void,
  data: Partial<any | object> | null,
  setData: (data: Partial<any | object>) => void,
  query: ParsedUrlQuery | null,
  reload: () => void,
  locale: string,
};

const PrefetchContext = createContext<PrefetchContext>({
  profile: null,
  setProfile: () => {},
  data: null,
  setData: () => {},
  query: null,
  reload: () => {},
  locale: 'en-US',
});

export default PrefetchContext;
