import { Outlet } from 'react-router-dom';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import { ItemType } from '@components/navbar/types.ts';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { CounterProvider } from '@/context/CounterContext.tsx';
import { UserManagerProvider, useUserManager } from '@/context/UserManager.tsx';

const HomeLayout = () => {
  const items: ItemType[] = [
    {
      label: 'Inicio',
      href: '/',
      current: false,
      icon: FaHome,
    },
    {
      label: 'Viajes',
      href: '/',
      current: false,
      icon: FaPlus,
    },
    {
      label: 'Notificaciones',
      href: '/',
      current: false,
      icon: FaMessage,
    },
    {
      label: 'Perfil',
      href: '/',
      current: false,
      icon: FaUser,
    },
  ];

  return (
    <UserManagerProvider>
      <ResponsiveLayout items={items}>
        <CounterProvider>
          <Outlet />
        </CounterProvider>
      </ResponsiveLayout>
    </UserManagerProvider>
  );
};

export default HomeLayout;
