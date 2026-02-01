import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import ScheduleTravelInterface from '$libs/types/interface/ScheduleTravelInterface.ts';
import {
  requestCurrentScheduleTravel,
  ScheduleOption,
  updateCurrentSchedule,
} from '$libs/request/schedule.ts';
import { getRequestRoot } from '$libs/request/api.ts';

interface Props {
  currentScheduleTravel: ScheduleTravelInterface | null;
  restoreCurrentScheduleTravel: () => Promise<boolean>;
  updateCurrentScheduleTravel: (options: ScheduleOption) => Promise<boolean>;
}

const DriverManagement = createContext<Props>({
  currentScheduleTravel: null,
  restoreCurrentScheduleTravel: async () => {
    return false;
  },
  updateCurrentScheduleTravel: async () => {
    return false;
  },
});

export const DriverManagementProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentSchedule, setCurrentSchedule] =
    useState<ScheduleTravelInterface | null>(null);

  const restoreCurrentTravel = async () => {
    let status = false;

    status = await requestCurrentScheduleTravel(
      getRequestRoot(),
      setCurrentSchedule,
    );

    if (!status) {
      setCurrentSchedule(null);
    }

    return status;
  };

  const updateCurrentScheduleTravel = async (options: ScheduleOption) => {
    const status = await updateCurrentSchedule(getRequestRoot(), options);

    if (status) {
      await restoreCurrentTravel();
    }
    return status;
  };
  return (
    <DriverManagement.Provider
      value={{
        currentScheduleTravel: currentSchedule,
        restoreCurrentScheduleTravel: restoreCurrentTravel,
        updateCurrentScheduleTravel: updateCurrentScheduleTravel,
      }}
    >
      {children}
    </DriverManagement.Provider>
  );
};

export const useDriverManagerContext = () => {
  return useContext(DriverManagement);
};
