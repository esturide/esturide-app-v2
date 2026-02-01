import React, { createContext, PropsWithChildren, useContext } from 'react';
import {
  checkRideAvailable,
  checkScheduleAvailable,
} from '$libs/request/check.ts';
import { getRequestRoot } from '$libs/request/api.ts';

type SessionType = {
  readonly scheduleFound: boolean;
  readonly rideFound: boolean;
};

interface Props {
  updateCurrentSession: () => Promise<SessionType>;
}

const SessionManagementContext = createContext<Props>({
  updateCurrentSession: async () => {
    return { scheduleFound: false, rideFound: false };
  },
});

export const SessionManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const requestCurrentSession = async () => {
    const scheduleFound = await checkScheduleAvailable(getRequestRoot());
    const rideFound = await checkRideAvailable(getRequestRoot());

    const currentSession: SessionType = {
      scheduleFound: scheduleFound,
      rideFound: rideFound,
    };

    return currentSession;
  };

  return (
    <SessionManagementContext.Provider
      value={{
        updateCurrentSession: requestCurrentSession,
      }}
    >
      {children}
    </SessionManagementContext.Provider>
  );
};

export const useSessionManagementProvider = () => {
  return useContext(SessionManagementContext);
};
