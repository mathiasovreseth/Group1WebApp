import React from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from "./styles/Theme";
import LandingPage from "./pages/LandingPage";
import {Route, Routes, useLocation, useNavigate, Navigate} from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./pages/RegistrationPage";
import {fakeAuthProvider} from "../src/routes/AuthRoute";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path={"/"} element={<LandingPage/>}/>
                    <Route
                        path="/about"
                        element={
                            <RequireAuth>
                                <AboutPage/>
                            </RequireAuth>
                        }
                    />
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/registration"} element={<RegistrationPage/>}/>
                </Routes>
                <Footer/>
            </AuthProvider>

        </ThemeProvider>

    );
}

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = {user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

// function AuthStatus() {
//     let auth = useAuth();
//     let navigate = useNavigate();
//
//     if (!auth.user) {
//         return <p>You are not logged in.</p>;
//     }
//
//     return (
//         <p>
//             Welcome {auth.user}!{" "}
//             <button
//                 onClick={() => {
//                     auth.signout(() => navigate("/"));
//                 }}
//             >
//                 Sign out
//             </button>
//         </p>
//     );
// }

function RequireAuth({children}: { children: JSX.Element }) {
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


