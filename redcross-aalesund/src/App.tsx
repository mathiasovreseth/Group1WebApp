import React, {useEffect} from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from "./styles/Theme";
import LandingPage from "./pages/LandingPage";
import {Route, Routes} from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./pages/RegistrationPage";
import {AuthProvider, RequireAuth, useAuth} from "./auth/Auth";

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










