import { useEffect } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaFacebookMessenger, FaHome, FaInfoCircle } from 'react-icons/fa';
import { ItemType } from '@components/navbar/types.ts';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';
import { useUserManager } from '@/context/UserManager.tsx';

const IndexLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserManager();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated]);

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
