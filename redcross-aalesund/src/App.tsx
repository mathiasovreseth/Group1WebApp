import React from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from 'styled-components';
import {defaultTheme} from "./styles/Theme";
import LandingPage from "./pages/LandingPage";
import {Route, Routes } from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            <Header/>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/about"} element={<AboutPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/registration"} element={<RegistrationPage />}/>
            </Routes>
            <Footer/>
        </ThemeProvider>
    );
}

