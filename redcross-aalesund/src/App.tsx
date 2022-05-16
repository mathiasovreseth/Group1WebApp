import React, {useEffect, useState} from 'react';
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
import {RequireAuth, useAuth} from "./auth/Auth";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

export default function App() {
   const auth = useAuth();

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            {/*wait for the authProvider to check if the user is authenticated or not*/}
            {auth.isAuthenticated != null &&
                <>
                    <Header/>
                    <Routes>
                        <Route path={"/"} element={<LandingPage/>}/>
                        {/*example route that need authentication*/}
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth>
                                    <AboutPage/>
                                </RequireAuth>
                            }
                        />
                        <Route path={"/terms-of-service"} element={<TermsOfServicePage/>}/>
                        <Route path={"/about"} element={ <AboutPage/>}/>
                        <Route path={"/privacy-policy"} element={<PrivacyPolicyPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/registration"} element={<RegistrationPage/>}/>
                    </Routes>
                    <Footer/>

                </>
            }


        </ThemeProvider>

    );
}










