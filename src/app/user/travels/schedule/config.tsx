import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import ScheduleTravelForm, {
  ScheduleTravelInput,
} from '@components/forms/ScheduleTravelForm.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import {
  LocationAddressParams,
  useTravelManagementContext,
} from '@/context/TravelManagementContext.tsx';
import Gender from '$libs/types/Gender.ts';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationAddressParams;

  const { scheduleTravel } = useTravelManagementContext();

  const onSchedule = async (schedule: ScheduleTravelInput) => {
    const genderFilter: Gender[] = [];

    if (schedule.genderFilter.female) {
      genderFilter.push('female');
    }

    if (schedule.genderFilter.male) {
      genderFilter.push('male');
    }

    const status = await scheduleTravel({
      origin: addressTo,
      destination: addressFrom,
      seats: schedule.seats,
      price: schedule.price,
      returnHome: false,
      genderFilter: genderFilter,
      startDate: new Date(),
    });

    if (status) {
      navigate('/home/travels/schedule/current');
    } else {
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
