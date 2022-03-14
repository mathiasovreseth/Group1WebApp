import React from 'react';
import HeroSection from "./components/heroSection/heroSection";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/header/header";
import TrustedReviews from './components/trustedReview/trustedReview';

export default function App() {
    return (
        <>
            <GlobalStyles/>
            <Header/>
            <HeroSection/>
            <TrustedReviews/>
        </>
    );
}

