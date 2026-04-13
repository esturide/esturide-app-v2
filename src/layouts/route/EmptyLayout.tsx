import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';

function EmptyLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserManagerContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated]);

  return <Outlet />;
}

export default EmptyLayout;
