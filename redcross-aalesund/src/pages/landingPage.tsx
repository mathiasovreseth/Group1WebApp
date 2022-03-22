import React from "react";
import GlobalStyles from "../styles/globalStyles";
import Header from "../components/header/header";
import HeroSection from "../components/heroSection/heroSection";
import Footer from "../components/footer/footer";
import Courses from "../components/courses/courses";

const LandingPage = () => {
    return (
       <>
        <Header/>
        <HeroSection/>
        <Courses/>
        <Footer/>
       </>
    );
}
export default LandingPage;