import React from 'react';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';

type Props = {
  reserveSpace?: boolean;
};

function MainResponsiveLayout({
  children,
  reserveSpace = true,
}: React.PropsWithChildren<Props>) {
  const { size } = useDeviceManagement();

  if (['sm'].includes(size)) {
    if (reserveSpace) {
      return (
        <div
          className={
            'mx-auto max-w-7xl px-6 py-4 flex flex-col h-full w-screen pb-24'
          }
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className={'mx-auto max-w-7xl px-6 py-4 flex flex-col h-full w-screen'}
      >
        {children}
      </div>
    );
  } else if (['md'].includes(size)) {
    if (reserveSpace) {
      return (
        <div
          className={
            'mx-auto max-w-2xl py-8 px-6 flex flex-col h-full w-screen pb-26'
          }
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className={'mx-auto max-w-2xl py-8 px-6 flex flex-col h-full w-screen'}
      >
        {children}
      </div>
    );
  } else if (['lg', 'xl'].includes(size)) {
    return (
      <div
        className={'mx-auto max-w-2xl py-8 px-6 flex flex-col h-full w-screen'}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        className={
          'mx-auto max-w-7xl px-6 py-8 lg:px-18 flex flex-col h-full items-center justify-center'
        }
      >
        {children}
      </div>
    );
  }
}

export default MainResponsiveLayout;
