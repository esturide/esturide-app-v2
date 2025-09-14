import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import { ScheduleTravelProvider } from '@/context/ScheduleTravelContext.tsx';

function TravelLayout() {
  const navigate = useNavigate();
  const { role } = useUserManager();

  return (
    <ScheduleTravelProvider>
      <Outlet />
    </ScheduleTravelProvider>
  );
}

export default TravelLayout;
