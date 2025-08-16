import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { ItemType } from '@components/navbar/types.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';

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
      href: '/home/request',
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
      <Outlet />
    </ResponsiveLayout>
  );
};

export default HomeLayout;
