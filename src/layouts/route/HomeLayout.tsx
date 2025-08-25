import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { ItemType } from '@components/navbar/types.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserManager();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated]);

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
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ResponsiveLayout>
  );
};

export default HomeLayout;
