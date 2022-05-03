import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AuthContextType} from "../models/AuthModel";
import {User} from "../models/UserModel";
import authProvider from "./AuthProvider";

// auth type


let AuthContext = React.createContext<AuthContextType>(null!);





export function AuthProvider({children}: { children: React.ReactNode }) {
    let [isValidToken, setIsValidToken] = useState<any>(false);
    useEffect(()=> {
      checkAuth();
    },[]);

    let signIn = (userFromLogin: User) => {
        return new Promise<string>((resolve, reject) => {
            authProvider.signIn(userFromLogin).then(res => {
                resolve("");
                setIsValidToken(true);
            }).catch(err => {
                reject(err);
            });

        })
    };
    let signOut = () => {
        setIsValidToken(false);
        return authProvider.signout();
    };
    let checkAuth = () => {
        if(authProvider.checkAuth()) {
            setIsValidToken(true);
        } else {
            setIsValidToken(false);
        }
    }

    let value = {isValidToken, signIn, checkAuth, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Wrap this inside a element's route to require authentication,
export function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    console.log(auth.isValidToken);
    if (!auth.isValidToken) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}
// auth hook
export function useAuth() {
    return React.useContext(AuthContext);
}

