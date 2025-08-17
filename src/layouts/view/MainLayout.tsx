import React, { useEffect } from 'react';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';

function MainLayout({ children }: React.PropsWithChildren) {
  const { size } = useDeviceManagement();

  useEffect(() => {}, [size]);

  if (['sm', 'md'].includes(size)) {
    return (
      <div
        className={
          'mx-auto max-w-7xl px-6 py-4 lg:px-8 flex flex-col items-start justify-center'
        }
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        className={
          'mx-auto max-w-7xl px-6 py-8 lg:px-8 flex flex-col items-center justify-center'
        }
      >
        <div>{children}</div>
      </div>
    );
  }
}

export default MainLayout;
