import React from 'react';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';

function MainLayout({ children }: React.PropsWithChildren) {
  const { size } = useDeviceManagement();

  if (['sm', 'md'].includes(size)) {
    return (
      <div
        className={
          'mx-auto max-w-7xl px-6 py-4 flex flex-col h-screen overflow-auto scroll-auto'
        }
      >
        {children}
      </div>
    );
  } else if (['lg', 'xl'].includes(size)) {
    return (
      <div
        className={
          'mx-auto max-w-2xl py-8 px-6 flex flex-col h-screen overflow-auto scroll-auto'
        }
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        className={
          'mx-auto max-w-7xl px-6 py-8 lg:px-18 flex flex-col h-screen items-center justify-center overflow-auto scroll-auto'
        }
      >
        {children}
      </div>
    );
  }
}

export default MainLayout;
