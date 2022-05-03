import {Navigate} from "react-router-dom";
import React from "react";

const authProvider = {
    signIn: (email: string, password:  string) =>  {
        const token = localStorage.getItem('token');
        const req = new Request("http://localhost:8080/api/users/login", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                Pragma: 'no-cache',
            }),
        });
        return fetch(req)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkError: (error: any) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    signout() {
        localStorage.removeItem('token');
        return <Navigate to={'/login'}/>
    },
    checkAuth: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    // ...
};

export default authProvider;