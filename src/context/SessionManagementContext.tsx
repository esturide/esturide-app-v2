import React, { createContext, PropsWithChildren, useContext } from 'react';
import { findCurrentSession, UserStatusResponse } from '$libs/request/check.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import CurrentSessionStatus from '$libs/types/CurrentSessionStatus.ts';

interface Props {
  refreshCurrentSession: () => Promise<UserStatusResponse>;
}

const SessionManagementContext = createContext<Props>({
  refreshCurrentSession: async () => ({
    session: 'free',
    role: 'standard',
  }),
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
