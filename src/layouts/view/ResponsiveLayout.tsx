import React from 'react';
import { isMobile } from 'react-device-detect';

function ResponsiveLayout({ children }: React.PropsWithChildren) {
  if (isMobile) {
    return (
      <div className="overflow-hidden mx-auto px-4 pt-4 w-full bg-white">
        {children}
      </div>
    );
  } else {
    return (
      <div className="overflow-hidden pt-4 mx-auto w-full bg-white max-w-[480px]">
        {children}
      </div>
    );
  }
}

export default ResponsiveLayout;
