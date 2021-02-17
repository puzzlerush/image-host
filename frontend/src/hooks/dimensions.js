import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        const handleResize = () => setDimensions(getWindowDimensions());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []);
    return dimensions
};

export default useWindowDimensions;