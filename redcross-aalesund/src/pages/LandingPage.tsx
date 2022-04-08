import React from "react";

import HeroSection from "../components/heroSection/HeroSection";
import OurWork from "../components/ourWork/OurWork";

import TrustedReviews from "../components/trustedReview/trustedReview";
import Courses from "../components/courses/Courses";


const LandingPage = () => {
    return (
        <>
            <HeroSection/>
            <OurWork/>
            <Courses/>
            <TrustedReviews/>
        </>
    );
}
export default LandingPage;