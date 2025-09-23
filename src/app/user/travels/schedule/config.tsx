import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import ScheduleTravelForm, {
  ScheduleTravelInput,
} from '@components/forms/ScheduleTravelForm.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import {
  LocationAddressParams,
  useTravelManagementContext,
} from '@/context/TravelManagementContext.tsx';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationAddressParams;

  const { googleApiKey } = useServiceApiManager();
  const { scheduleTravel } = useTravelManagementContext();

  const onSchedule = async (schedule: ScheduleTravelInput) => {
    const status = await scheduleTravel({
      from: schedule.addressFrom,
      to: schedule.addressTo,
      seats: schedule.seats,
      maxPassengers: schedule.seats.length,
      price: schedule.price,
      returnHome: false,
    });

    if (!status) {
      failureMessage('No se pudo agendar tu viaje.');
    }
  };

  return (
    <>
      <MainResponsiveLayout>
        <ScheduleTravelForm
          currentSchedule={{ addressFrom: addressFrom, addressTo: addressTo }}
          onSchedule={onSchedule}
          onCancel={() => {
            navigate('/home/travels/schedule/');
          }}
        />
      </MainResponsiveLayout>
    </>
  );
}

export default ScheduleConfig;
