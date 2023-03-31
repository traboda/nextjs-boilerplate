import { ParsedUrlQuery } from 'querystring';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Fetch } from '../types';
import { ProfileFetchConfig } from '../fetch-configs';

import ClientFetcher from './client-fetcher';
import PrefetchContext, { ProfileContextType } from './context';

export type PageContextChildrenProps = {
  profile: ProfileContextType | null,
  setProfile?: (profile: ProfileContextType) => void,
  data: Partial<(any | object)>,
  setData: (data: Partial<(any | object)>) => void,
  locale: string,
  query: ParsedUrlQuery
};

type Provider = {
  loginRequired?: boolean,
  data?: any,
  fetches?: Fetch[],
  query: ParsedUrlQuery,
  profile?: ProfileContextType | null,
  children: (data: PageContextChildrenProps) => React.ReactElement,
  locale: string | undefined
};

const ContextProvider = ({
  children,
  query,
  data: _data,
  profile: _profile = null,
  loginRequired = false,
  fetches = [], locale = 'en',
}: Provider) => {

  const [profile, setProfile] = useState<ProfileContextType | null>(_profile);
  const [data, setData] = useState(_data);
  const router = useRouter();

  const fetchData = () => {
    ClientFetcher({
      fetches: [
        ...fetches,
        ProfileFetchConfig,
      ],
      query,
    }).then(({ errors: _e, profile, ...data }) => {
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
  }, [profile]);

  return (
      <PrefetchContext.Provider value={{ profile, setProfile, data, setData, query, reload: fetchData, locale }}>
          {children({ data, profile, setProfile, setData, query, locale })}
      </PrefetchContext.Provider>
  );

};

export default ContextProvider;
