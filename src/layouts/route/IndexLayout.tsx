import { Outlet } from 'react-router-dom';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { ItemType } from '@components/navbar/types.ts';
import { FaFacebookMessenger, FaHome, FaInfoCircle } from 'react-icons/fa';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';

const IndexLayout = () => {
  const items: ItemType[] = [
    {
      label: 'Inicio',
      href: '/',
      current: false,
      icon: FaHome,
    },
    {
      label: 'Sobre',
      href: '/',
      current: false,
      icon: FaInfoCircle,
    },
    {
      label: 'Contacto',
      href: '/',
      current: false,
      icon: FaFacebookMessenger,
    },
  ];

  const ResponsiveLayout = () => {
    if (isMobile) {
      return (
        <MobileView>
          <Outlet />
        </MobileView>
      );
    } else {
      return (
        <BrowserView>
          <DesktopNavigationBar items={items} />
          <Outlet />
        </BrowserView>
      );
    }
  };

  return <ResponsiveLayout />;
};

export default IndexLayout;
