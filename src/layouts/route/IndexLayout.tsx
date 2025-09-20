import React, { useEffect, useId } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaFacebookMessenger, FaHome, FaInfoCircle } from 'react-icons/fa';
import { ItemType } from '@components/navbar/types.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import DesktopView from '@layouts/view/DesktopView.tsx';
import GradientAnimatedBackground from '@layouts/view/animated/GradientAnimatedBackground.tsx';
import FooterPresentation from '@components/resources/FooterPresentation.tsx';

const IndexLayout = () => {
  const id = useId();
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
      return (
        <div id={id} className={'flex flex-col'}>
          {children}
          <FooterPresentation />
        </div>
      );
    } else {
      return (
        <DesktopView items={items}>
          <div id={id} className={'flex flex-col '}>
            {children}
          </div>
          <FooterPresentation />
        </DesktopView>
      );
    }
  };

  return (
    <GradientAnimatedBackground dark>
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    </GradientAnimatedBackground>
  );
};

export default IndexLayout;
