import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaFacebookMessenger, FaHome, FaInfoCircle } from 'react-icons/fa';
import { ItemType } from '@components/navbar/types.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import DesktopView from '@layouts/view/DesktopView.tsx';

const IndexLayout = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceManagement();
  const { isAuthenticated } = useUserManager();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
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

  const ResponsiveLayout = ({ children }: React.PropsWithChildren) => {
    if (isMobile) {
      return <>{children}</>;
    } else {
      return <DesktopView items={items}>{children}</DesktopView>;
    }
  };

  return (
    <ResponsiveLayout>
      <Outlet />
    </ResponsiveLayout>
  );
};

export default IndexLayout;
