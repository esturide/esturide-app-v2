import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '@components/resources/Logo.tsx';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import { useUserManager } from '@/context/UserManager.tsx';

function EmptyLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserManager();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <Outlet />
    </PresentationLayout>
  );
}

export default EmptyLayout;
