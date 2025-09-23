import { Outlet } from 'react-router-dom';
import React from 'react';
import { TravelManagementProvider } from '@/context/TravelManagementContext.tsx';

function TravelLayout() {
  return (
    <TravelManagementProvider>
      <Outlet />
    </TravelManagementProvider>
  );
}

export default TravelLayout;
