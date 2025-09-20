import React, { useId } from 'react';
import { ItemType } from '@components/navbar/types.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import MobileView from '@layouts/view/MobileView.tsx';
import DesktopView from '@layouts/view/DesktopView.tsx';
import FooterPresentation from '@components/resources/FooterPresentation.tsx';

type Props = {
  items: ItemType[];
};

function ResponsiveLayout({ children, items }: React.PropsWithChildren<Props>) {
  const id = useId();
  const { theme } = useUserTheme();
  const { isMobile, isTablet } = useDeviceManagement();

  const DesktopViewLayout = () => {
    return (
      <DesktopView items={items}>
        <div id={id} className={'flex flex-col'}>
          {children}
          <FooterPresentation />
        </div>
      </DesktopView>
    );
  };

  const MobileViewLayout = () => {
    return (
      <MobileView theme={theme} items={items}>
        <div id={id}>{children}</div>
      </MobileView>
    );
  };

  const ResponseLayout = () => {
    if (isMobile || isTablet) {
      return <MobileViewLayout />;
    } else {
      return <DesktopViewLayout />;
    }
  };

  return (
    <div className={'overflow-visible'}>
      <ResponseLayout />
    </div>
  );
}

export default ResponsiveLayout;
