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
  }, [isAuthenticated, navigate]);

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

  useEffect(() => {
    throw Error('Test error');
  }, []);

  return (
    <ResponsiveLayout>
      <GradientAnimatedBackground dark>
        <Outlet />
      </GradientAnimatedBackground>
    </ResponsiveLayout>
  );
};

export default IndexLayout;
