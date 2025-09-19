import React, { createContext, useContext, useEffect, useState } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | 'unknown';

interface WindowSize {
  size: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
}

const DeviceManagementContext = createContext<WindowSize>({
  size: 'unknown',
  isMobile: false,
  isTablet: false,
});

export function DeviceManagementProvider({
  children,
}: React.PropsWithChildren) {
  const [size, setSize] = useState<ScreenSize>('unknown');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize('sm');
      } else if (width >= 640 && width < 1024) {
        setSize('md');
      } else {
        setSize('lg');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (['sm'].includes(size)) {
      setIsTablet(false);
      setIsMobile(true);
    } else if (['md'].includes(size)) {
      setIsTablet(true);
      setIsMobile(false);
    } else {
      for (const setState of [setIsTablet, setIsMobile]) {
        setState(false);
      }
    }
  }, [size]);

  return (
    <DeviceManagementContext.Provider
      value={{
        size: size,
        isMobile: isMobile,
        isTablet: isTablet,
      }}
    >
      {children}
    </DeviceManagementContext.Provider>
  );
}

export const useDeviceManagement = (): WindowSize => {
  const context = useContext(DeviceManagementContext);

  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider');
  }

  return context;
};
