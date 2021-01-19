import { useEffect, useRef, useState, useCallback } from 'react';

export default function useScrollDetection(threshold: number = 0) {
  const prevScrollY = useRef(window.scrollY);

  const [isGoingUp, setIsGoingUp] = useState(false);
  const [isAboveThreshold, setIsAboveThreshold] = useState(
    prevScrollY.current > threshold
  );

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsGoingUp((prevIsGoingUp) => {
      if (prevScrollY.current < currentScrollY && prevIsGoingUp) {
        return false;
      }

      if (prevScrollY.current > currentScrollY && !prevIsGoingUp) {
        return true;
      }

      return prevIsGoingUp;
    });

    prevScrollY.current = currentScrollY;

    setIsAboveThreshold((prevIsAboveThreshold) => {
      if (!prevIsAboveThreshold && currentScrollY > threshold) {
        return true;
      }

      if (prevIsAboveThreshold && currentScrollY < threshold) {
        return false;
      }

      return prevIsAboveThreshold;
    });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGoingUp, handleScroll]);

  return { isGoingUp, isAboveThreshold };
}
