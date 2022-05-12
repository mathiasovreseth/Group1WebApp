import {Navigate} from "react-router-dom";
import React from "react";
import {User} from "../models/UserModel";
import {deleteCookie, getCookie, setCookie} from "../utils/coockies";
import {sendApiRequest} from "../utils/requests";


export const authProvider = {

    signIn: (user: User) => {
        return new Promise((resolve, reject) => {
            const postData = {
                "email": user.email,
                "password": user.password
            };
            const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
            setCookie("jwt", jwt, 1);
            const userData = authProvider.parseJwtUser(jwt);
            console.log(userData);
            if(userData) {
                setCookie("current_email", userData.email, 1);
                setCookie("current_user_role", userData.role, 1);
                // setCookie("current_user_roles", userData.roles.join(","), 1);
                resolve(userData);
            } else {
                reject("error");
            }
            // sendApiRequest(
            //     "POST", "/authenticate",
            //     function (jwtResponse: any) {
            //         setCookie("jwt", jwtResponse.jwt, 1);
            //         const userData = authProvider.parseJwtUser(jwtResponse.jwt);
            //         if (userData) {
            //             setCookie("current_username", userData.username, 1);
            //             setCookie("current_user_roles", userData.roles.join(","), 1);
            //             resolve(userData)
            //         }
            //     },
            //     postData,
            //     function (responseText: string) {
            //         reject(responseText)
            //     }
            // );
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
    parseJwt: (token: string) =>  {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
    parseJwtUser: (jwtString: string) => {
            let user = null;
            const jwtObject = authProvider.parseJwt(jwtString);
            if (jwtObject) {
                user = {
                    "email": jwtObject.name,
                    "role": jwtObject.sub,
                    // "roles": jwtObject.roles.map((r: any) => r.authority)
                }
            }
            return user;
    },

    signout() {
        deleteCookie("jwt");
        deleteCookie("current_email");
        deleteCookie("current_user_role");
        return <Navigate to={'/login'}/>
    },

    getAuthUser: () => {
        return new Promise((resolve, reject) => {
            let user = null;
            const username = getCookie("current_email");
            const commaSeparatedRoles = getCookie("current_user_role");
            if (username && commaSeparatedRoles) {
                const roles = commaSeparatedRoles.split(",");
                user = {
                    "email": username,
                    "role": roles
                }
            } else {
                reject("User not in cookies");
            }
            resolve(user);
        });
    },
    getPermissions: () => {
        return localStorage.getItem('role');
    },

    // ...
};

export default authProvider;