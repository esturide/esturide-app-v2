import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import { ItemType } from '@components/navbar/types.ts';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { CounterProvider } from '@/context/CounterContext.tsx';
import { useUserManager } from '@/context/UserManager.tsx';
import { useEffect, useState } from 'react';

const IndexLayout = () => {
  const { isAuthenticated, token } = useUserManager();

  const items: ItemType[] = [
    {
      label: 'Inicio',
      href: '/',
      current: false,
      icon: FaHome,
    },
  ];

  return (
    <ResponsiveLayout items={items}>
      <CounterProvider>
        <Outlet />
      </CounterProvider>
    </ResponsiveLayout>
  );
};

export default IndexLayout;
