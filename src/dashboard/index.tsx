import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Button } from 'chaya-ui';

import APIFetch from '../utils/APIFetch';
import { PrefetchContext } from '../utils';


const DashboardPage = () => {

    const { profile, setProfile } = useContext(PrefetchContext);

    const handleLogout = () => {
        APIFetch({
            query: `mutation {
                logout
            }`,
        }).then(({ success, data, error }) => {
            if (success && data?.logout) {
                setProfile(null);
            } else {
                toast.error(error?.message);
            }
        });
    };

    return (
        <div>
            <h1>
                Hello
                {profile?.username}
                !
            </h1>
            <div className="mt-3">
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );

};

export default DashboardPage;