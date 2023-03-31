import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useScreenSize = () => {

  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const _isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const _isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const _isLargeScreen = useMediaQuery({ query: '(min-width: 1280px)' });

  useEffect(() => {
    setIsDesktopOrLaptop(_isDesktopOrLaptop);
    setIsMobile(_isMobile);
    setIsLargeScreen(_isLargeScreen);
  }, [_isDesktopOrLaptop, _isMobile, _isLargeScreen]);

  return { isMobile, isDesktopOrLaptop, isLargeScreen };

};

export default useScreenSize;