import React from 'react';
import { isMobile } from 'react-device-detect';

function MainLayout({ children }: React.PropsWithChildren) {
  if (isMobile) {
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
