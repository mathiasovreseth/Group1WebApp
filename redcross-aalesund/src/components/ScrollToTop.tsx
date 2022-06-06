import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

// handles scrolling to top of the page on page switch
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;