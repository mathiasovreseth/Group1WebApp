import React from 'react';
import GlobalStyles from "./styles/globalStyles";
import { ThemeProvider } from 'styled-components';
import {defaultTheme} from "./styles/theme";
import LandingPage from "./pages/landingPage";
import {Route, Routes } from 'react-router-dom';
import AboutPage from "./pages/aboutPage";
import LoginPage from "./pages/loginPage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import RegistrationForm from "./components/registration/RegistrationForm";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            <Header/>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/about"} element={<AboutPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/registration"} element={<RegistrationForm />}/>
            </Routes>
            <Footer/>
        </ThemeProvider>
    );
}

