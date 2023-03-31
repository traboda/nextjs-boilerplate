import { useEffect, useState } from 'react';
import store from 'store2';

type OAuthRegType = {
  otp: string,
  email: string
};

const useOAuth = () => {

  const [user, setUser] = useState<OAuthRegType | null>(store.get('OAuthInfo') || null);

  const onStorageUpdate = ({ key }: StorageEvent) => {
    if(key === 'OAuthInfo')
      setUser(store.get('OAuthInfo'));
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  useEffect(() => {
    if(user)
      store.set('OAuthInfo', { ...user });
    else if(user == null)
      store.remove('OAuthInfo');
  }, [user]);

  return [user, setUser] as const;
};

export default useOAuth;