import React from 'react';
import HeroSection from "./components/heroSection/heroSection";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export default function App() {
    return (
        <>
            <GlobalStyles/>
            <Header/>
            <HeroSection/>
            <Footer/>


        </>
    );
}

