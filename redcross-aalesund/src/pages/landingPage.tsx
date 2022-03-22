import React from "react";
import GlobalStyles from "../styles/globalStyles";
import Header from "../components/header/header";
import HeroSection from "../components/heroSection/heroSection";
import OurWork from "../components/ourWork/ourWork";
import Footer from "../components/footer/footer";
import TrustedReviews from "../components/trustedReview/trustedReview";


const LandingPage = () => {
    return (
        <>
            <Header/>
            <HeroSection/>
            <OurWork/>
            <TrustedReviews/>
            <Footer/>
        </>
    );
}
export default LandingPage;