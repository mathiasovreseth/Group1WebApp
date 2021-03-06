import React, {useEffect, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContextType} from "../models/AuthModel";
import {User, UserAuthResponse, UserRegistrationFormValues} from "../models/UserModel";
import {sendApiRequest} from "../utils/requests";
import {deleteCookie, getCookie, setCookie} from "../utils/coockies";
import authHelper from "./AuthProvider";


let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = useState<any>(null);
    let [isAuthenticated, setIsAuthenticated] = useState<any>(null);
    const navigate = useNavigate();
    useEffect(()=> {
        initializeAuth();
    }, []);

    let signIn = (userFromLogin: User): Promise<string>  => {
        return new Promise((resolve, reject) => {
            const postData = {
                "email": userFromLogin.email,
                "password": userFromLogin.password
            };
            sendApiRequest("POST", "/auth/login", postData,true).then((jwtResponse: any) => {
                setCookie("jwt", jwtResponse.jwt, 2);
                const userData: UserAuthResponse | null = authHelper.parseJwtUser(jwtResponse.jwt);
                if (userData) {
                    setCookie("current_email", userData.email, 1);
                    setCookie("current_user_role", userData.role, 1);
                    setCookie("user_id", userData.id, 1);
                    setCookie("user_name", userData.name, 1);
                    const userAuth: UserAuthResponse = {
                        id: userData.id,
                        email: userData.email,
                        role: userData.role,
                        name: userData.name
                    }
                    setUser(userAuth);
                    setIsAuthenticated(true);
                    resolve("")
                } else {
                    // notify caller of error
                    reject("no user data")
                }
            }).catch((err: any) => {
                // notify caller of error
                reject(err);
            })
        });
    };
    let signUp = (userFromRegistration: UserRegistrationFormValues, ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const postData = {
                "name": userFromRegistration.name,
                "email": userFromRegistration.email,
                "password": userFromRegistration.password
            };
            sendApiRequest("POST", "/auth/register", postData,  false).then((data: any) => {
                // notify caller of success;
                resolve("");
            }).catch((err: any) => {
                // notify caller of error;
                reject(err);
            });
        });
    };

    let signOut = () => {
        deleteCookie("jwt");
        deleteCookie("current_email");
        deleteCookie("current_user_role");
        deleteCookie("user_id");
        deleteCookie("user_name");

        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    // gets called when app is first loaded to retrieve userdata from cookies
    let initializeAuth =  () => {
        const email = getCookie("current_email");
        const role = getCookie("current_user_role");
        const id = getCookie("user_id");
        const name = getCookie("user_name");
        if (email && role) {
            const userAuth: UserAuthResponse = {
                id: id,
                email: email,
                role: role,
                name: name,
            }
            setUser(userAuth as UserAuthResponse);
            setIsAuthenticated(true);
        } else {
            deleteCookie("jwt");
            deleteCookie("current_email");
            deleteCookie("current_user_role");
            deleteCookie("user_id");
            deleteCookie("user_name");

            setIsAuthenticated(false);
            setUser(null);
        }
    }


    let value = {user, signIn, signUp, initializeAuth, signOut, isAuthenticated};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Wrap this inside a element's route to require authentication,
export function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}
export function RequireAdminAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    if (auth.user.role !== "ADMIN") {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}
// auth hook
export function useAuth() {
    return React.useContext(AuthContext);
}

