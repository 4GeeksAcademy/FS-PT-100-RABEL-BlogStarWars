import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    const prevLocation = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevLocation.current) {
            window.scrollTo(0, 0);
        }
        prevLocation.current = location.pathname;
    }, [location]);

    return children;
};

ScrollToTop.propTypes = {
    children: PropTypes.any
};

export default ScrollToTop;