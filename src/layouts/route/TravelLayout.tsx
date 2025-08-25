import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';

function TravelLayout() {
  const navigate = useNavigate();
  const { role } = useUserManager();

  return (
    <>
      <Outlet />
    </>
  );
}

export default TravelLayout;
