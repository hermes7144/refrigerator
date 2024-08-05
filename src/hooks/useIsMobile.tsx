import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => /Mobi|Android/i.test(navigator.userAgent));

  useEffect(() => {
    // Function to update the state based on user agent
    const updateIsMobile = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };

    // You can listen for changes if needed
    // For user agent detection, this typically doesn't change dynamically

    // Initial check
    updateIsMobile();

    // Optional cleanup if you had any event listeners
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array to run once on mount

  return isMobile;
}

export default useIsMobile;
