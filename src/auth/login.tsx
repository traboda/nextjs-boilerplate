import React, {useContext, useState} from "react";
import {Button, TextInput} from "@traboda/dsr";
import {toast} from "react-toastify";

import APIFetch from "../utils/APIFetch";
import PrefetchContext from "../AppView/prefetch/context";

const LoginPage = ({ email = '' }) => {

    const [data, setData] = useState({ username: email, password: '' });
    const [loading, setLoading] = useState(false);
    const { setProfile } = useContext(PrefetchContext);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        APIFetch({
            query: `mutation ($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                  id
                  username
                  name
              }
            }`,
            variables: data,
        }).then(({ success, data, error }) => {
            setLoading(false);
            if(success && data?.login) {
                setProfile(data.login);
            } else {
                toast.error(error?.message);
            }
        });
    };

    return (
        <div>
            <form id="login-form" onSubmit={handleLogin}>
                <TextInput
                    label="E-mail or Username"
                    name="username"
                    value={data?.username}
                    onChange={(username) => setData({ ...data, username })}
                    inputStyle={{ fontSize: '1.25rem' }}
                    placeholder="Enter your username or email"
                    required
                />
                <div className="py-2">
                    <TextInput
                        label="Password"
                        name="current-password"
                        type="password"
                        value={data?.password}
                        onChange={(password) => setData({ ...data, password })}
                        inputStyle={{ fontSize: '1.25rem' }}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="py-3">
                    <Button
                        disabled={loading}
                        size="lg"
                        className="w-full"
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;