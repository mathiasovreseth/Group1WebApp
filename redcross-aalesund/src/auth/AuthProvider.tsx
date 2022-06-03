import {Navigate} from "react-router-dom";
import React from "react";
import {User, UserAuthResponse, UserRegistrationFormValues} from "../models/UserModel";
import {deleteCookie, getCookie, setCookie} from "../utils/coockies";
import {sendApiRequest} from "../utils/requests";

//
export const authHelper = {
    parseJwt: (token: string) =>  {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
    parseJwtUser: (jwtString: string) => {
            let user: UserAuthResponse | null = null;
            const jwtObject = authHelper.parseJwt(jwtString);
            const splittedRoles = jwtObject.roles.split(":");
            const roleString: string = splittedRoles[0];
            const roleStringFormatted = roleString.substr(1, roleString.length -2);

        if (jwtObject) {
                user = {
                    email: jwtObject.sub,
                    role: roleStringFormatted,
                    name: splittedRoles[1]
                }

            }
            return user;
    },
    getPermissions: () => {
        return getCookie("current_user_role");
    },

    // ...
};

export default authHelper;