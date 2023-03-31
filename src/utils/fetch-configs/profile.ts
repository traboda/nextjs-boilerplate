import { Fetch } from '../types';

const MY_PROFILE_QUERY = `
profile:me {
    id
    name
    username
    
}`;

// eslint-disable-next-line import/no-unused-modules
export const ProfileFetchConfig: Fetch = {
  key: 'profile',
  query: MY_PROFILE_QUERY,
};

export default ProfileFetchConfig;