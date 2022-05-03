import {Navigate} from "react-router-dom";
import React from "react";
import {User} from "../models/UserModel";



export const authProvider = {
    signIn:  (user: User) => {
        return new Promise((resolve, reject)=> {
            const t = true;
            if(t) {
                localStorage.setItem('token', "bnlasdasdkjadskljadjwanj");
                resolve("Sucess");
            } else {
                reject("failed");
            }
            // const token = localStorage.getItem('token');
            // const req = new Request("http://localhost:8080/api/users/login", {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         email: user.email,
            //         password: user.password,
            //     }),
            //     headers: new Headers({
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`,
            //         Pragma: 'no-cache',
            //     }),
            // });
            // return fetch(req).then(response => {
            //         localStorage.setItem('token', JSON.stringify(response.json()));
            //         resolve("Sucess");
            //     }).catch((error) => {
            //         authProvider.checkError(error);
            //     });
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
        const token = localStorage.getItem('token');
        // returns true if token exists
        return token != null;
    },
    getPermissions: () => {
        // Required for the authentication to work
        return localStorage.getItem('role');
    },

    // ...
};

export default authProvider;