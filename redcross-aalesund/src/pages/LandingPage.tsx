import React from "react";

import HeroSection from "../components/heroSection/HeroSection";
import OurWork from "../components/ourWork/OurWork";

import TrustedReviews from "../components/trustedReview/trustedReview";
import {MyComponent} from "../components/courses/Courses";


const LandingPage = () => {
    return (
        <>
            <HeroSection/>
            <OurWork/>
            <MyComponent/>
            <TrustedReviews/>
        </>
    );
}
export default LandingPage;