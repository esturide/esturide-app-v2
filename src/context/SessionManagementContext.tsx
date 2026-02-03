import React, { createContext, PropsWithChildren, useContext } from 'react';
import { findCurrentSession } from '$libs/request/check.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import CurrentSessionStatus from '$libs/types/CurrentSessionStatus.ts';

interface Props {
  refreshCurrentSession: () => Promise<CurrentSessionStatus>;
}

const SessionManagementContext = createContext<Props>({
  refreshCurrentSession: async () => 'free',
});

export const SessionManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const requestCurrentSession = async () => {
    return await findCurrentSession(getRequestRoot());
  };

  return (
    <SessionManagementContext.Provider
      value={{
        refreshCurrentSession: requestCurrentSession,
      }}
    >
      {children}
    </SessionManagementContext.Provider>
  );
};

export const useSessionManagementProvider = () => {
  return useContext(SessionManagementContext);
};
