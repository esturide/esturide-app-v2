import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '@components/resources/Logo.tsx';
import PresentationLayout from '@layouts/PresentationLayout.tsx';

function EmptyLayout() {
  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <Outlet />
    </PresentationLayout>
  );
}

export default EmptyLayout;
