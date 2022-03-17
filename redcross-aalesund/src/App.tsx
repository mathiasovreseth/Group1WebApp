import React from 'react';
import HeroSection from "./components/heroSection/heroSection";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeProvider } from 'styled-components';
import {defaultTheme} from "./styles/theme";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            <Header/>
            <HeroSection/>
            <Footer/>
        </ThemeProvider>
    );
}

