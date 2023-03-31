import { useEffect, useState } from 'react';
import store from 'store2';

type User = {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string,
    username: string
  }
};

const useAuth = () => {

  const [user, setUser] = useState<User>(store.get('UserInfo') || null);

  const onStorageUpdate = ({ key }) => {
    if(key === 'UserInfo')
      setUser(store.get('UserInfo'));
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  useEffect(() => {
    if(user)
      store.set('UserInfo', { ...user, isLoggedIn: true });
    else if(user == null)
      store.remove('UserInfo');
  }, [user]);

  return [user, setUser] as const;
};

export default useAuth;