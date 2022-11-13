import { FetcherQuery } from "../types";

const MY_PROFILE_QUERY = `
profile:me {
    id
    name
    username
    
}`;

export const ProfileFetchConfig: FetcherQuery = {
    key: 'profile',
    query: MY_PROFILE_QUERY
};

export default ProfileFetchConfig;