import React from 'react';
import GlobalStyles from "./styles/globalStyles";
import { ThemeProvider } from 'styled-components';
import {defaultTheme} from "./styles/theme";
import LandingPage from "./pages/landingPage";
import {Route, Routes } from 'react-router-dom';
import AboutPage from "./pages/aboutPage";
import LoginPage from "./pages/loginPage";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/about"} element={<AboutPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
            </Routes>
        </ThemeProvider>
    );
}

