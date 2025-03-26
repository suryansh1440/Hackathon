import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is available (client-side)
        if (typeof window === 'undefined') return;

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkIsMobile();

        // Add event listener
        window.addEventListener('resize', checkIsMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
