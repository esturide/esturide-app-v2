import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';

function EmptyLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserManager();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated]);

  return <Outlet />;
}

export default EmptyLayout;
