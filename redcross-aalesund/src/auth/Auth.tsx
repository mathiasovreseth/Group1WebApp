import React from "react";
import {Navigate, useLocation} from "react-router-dom";

// auth type
interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

interface LoginCredentials {
    email: string,
    password: string,
}
const myAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        myAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};


export function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return myAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return myAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = {user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Wrap this inside a element's route to require authentication,
 */
export function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export async function helperAuthRequest(url:string, data:any) {
    const token = localStorage.getItem('token');
    const req = new Request(url, {
        method: 'POST',
        body: JSON.stringify(
            data
        ),
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Pragma: 'no-cache',
        }),
    });

    return fetch(req).then(response => {
        if (response.status === 409 || response.status === 403 || response.status === 400) {
            return response.text()
        }
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return <Navigate to={'/login'}/>
        }

        return response.json();
    }).then(jsonData => {
        return jsonData;
    })
}