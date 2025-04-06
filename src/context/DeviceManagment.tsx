import React, { createContext, useState, useEffect, useContext } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const DeviceManagmentContext = createContext<WindowSize>({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const DeviceManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceManagmentContext.Provider value={size}>
      {children}
    </DeviceManagmentContext.Provider>
  );
};

export const useDeviceManagement = (): WindowSize => {
  const context = useContext(DeviceManagmentContext);

  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider');
  }

  return context;
};
