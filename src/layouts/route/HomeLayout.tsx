import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { selectThemeFromRole } from '$libs/select/color.ts';
import { ItemType } from '@components/navbar/types.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { ScheduleTravelManagementProvider } from '@/context/ScheduleTravelManagementContext.tsx';
import { UserProfileProvider } from '@/context/UserProfileManager.tsx';
import { SessionManagementProvider } from '@/context/SessionManagementContext.tsx';
import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import RecordLocationLayout from '@layouts/record/RecordLocationLayout.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useUserManagerContext();
  const { setTheme } = useUserTheme();

  useEffect(() => {
    setTheme(selectThemeFromRole(role));
  }, [role]);

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
      <UserProfileProvider>
        <SessionManagementProvider>
          <RecordLocationLayout>
            <Outlet />
          </RecordLocationLayout>
        </SessionManagementProvider>
      </UserProfileProvider>
    </ResponsiveLayout>
  );
};

export default HomeLayout;
