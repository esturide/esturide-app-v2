import React from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { ItemType } from '@components/navbar/types.ts';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';
import MobileNavigationBar from '@components/navbar/MobileNavigationBar.tsx';

type Props = {
  items: ItemType[];
};

function HomeLayout({ children, items }: React.PropsWithChildren<Props>) {
  const DesktopViewLayout = () => {
    return (
      <>
        <BrowserView>
          <DesktopNavigationBar items={items} />
          {children}
        </BrowserView>
      </>
    );
  };

  const MobileViewLayout = () => {
    return (
      <>
        <MobileView>
          {children}
          <MobileNavigationBar items={items} />
        </MobileView>
      </>
    );
  };

  if (isMobile) {
    return <MobileViewLayout />;
  } else {
    return <DesktopViewLayout />;
  }
}

export default HomeLayout;
