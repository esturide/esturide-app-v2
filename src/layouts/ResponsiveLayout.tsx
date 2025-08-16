import React from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { ItemType } from '@components/navbar/types.ts';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';
import MobileNavigationBar from '@components/navbar/MobileNavigationBar.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';

type Props = {
  items: ItemType[];
};

function ResponsiveLayout({ children, items }: React.PropsWithChildren<Props>) {
  const { theme } = useUserTheme();

  const DesktopViewLayout = () => {
    return (
      <>
        <BrowserView>
          <DesktopNavigationBar items={items} />
          <div className={'pt-16'}>{children}</div>
        </BrowserView>
      </>
    );
  };

  const MobileViewLayout = () => {
    return (
      <>
        <MobileView>
          {children}
          <MobileNavigationBar items={items} theme={theme} />
        </MobileView>
      </>
    );
  };

  const ResponseLayout = () => {
    if (isMobile) {
      return <MobileViewLayout />;
    } else {
      return <DesktopViewLayout />;
    }
  };

  return <ResponseLayout />;
}

export default ResponsiveLayout;
