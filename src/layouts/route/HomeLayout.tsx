import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import { ItemType } from '@components/navbar/types.ts';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { useUserManager } from '@/context/UserManager.tsx';
import { useEffect } from 'react';

const HomeLayout = () => {
  const { isAuthenticated, token } = useUserManager();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, token);

    if (!isAuthenticated) {
      navigate('/login');
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
    <ResponsiveLayout items={items}>
      <Outlet />
    </ResponsiveLayout>
  );
};

export default HomeLayout;
