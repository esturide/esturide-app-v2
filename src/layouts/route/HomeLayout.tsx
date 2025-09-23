import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { ItemType } from '@components/navbar/types.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { TravelManagementProvider } from '@/context/TravelManagementContext.tsx';
import { selectThemeFromRole } from '$libs/select/color.ts';

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useUserManager();
  const { setTheme } = useUserTheme();

  useEffect(() => {
    setTheme(selectThemeFromRole(role));
  }, [role]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {}, []);

  const items: ItemType[] = [
    {
      label: 'Inicio',
      href: '/home',
      current: false,
      icon: FaHome,
    },
    {
      label: 'Viajes',
      href: '/home/travels',
      current: false,
      icon: FaPlus,
    },
    {
      label: 'Notificaciones',
      href: '/home/notify',
      current: false,
      icon: FaMessage,
    },
    {
      label: 'Perfil',
      href: '/home/profile',
      current: false,
      icon: FaUser,
    },
  ];

  return (
    <ResponsiveLayout items={items}>
      <TravelManagementProvider>
        <Outlet />
      </TravelManagementProvider>
    </ResponsiveLayout>
  );
};

export default HomeLayout;
