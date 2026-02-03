import React, { createContext, PropsWithChildren, useContext } from 'react';
import { useSessionManagementProvider } from '@/context/SessionManagementContext.tsx';

interface Props {}

const PassengerManagement = createContext<Props>({});

export const PassengerManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { refreshCurrentSession } = useSessionManagementProvider();

  return (
    <PassengerManagement.Provider value={{}}>
      {children}
    </PassengerManagement.Provider>
  );
};

export const useDriverManagerContext = () => {
  return useContext(PassengerManagement);
};
