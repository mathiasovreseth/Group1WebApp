import React from "react";

import HeroSection from "../components/heroSection/HeroSection";
import OurWork from "../components/ourWork/OurWork";

import TrustedReviews from "../components/trustedReview/trustedReview";
import {CourseNoForm} from "../components/courses/CoursesNoFrom";


const LandingPage = () => {
    return (
        <>
            <HeroSection/>
            <OurWork/>
            <CourseNoForm/>
            <TrustedReviews/>
        </>
    );
}
export default LandingPage;