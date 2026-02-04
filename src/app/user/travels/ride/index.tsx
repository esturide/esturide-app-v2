import React, { useEffect } from 'react';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { filterSchedule } from '$libs/request/schedule.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useNavigate } from 'react-router-dom';
import RideForm from '@components/forms/RideForm.tsx';

function RequestRideTravel() {
  const navigate = useNavigate();

  const { theme } = useUserTheme();

  useEffect(() => {
    const request = async () => {
      await filterSchedule(
        getRequestRoot(),
        {
          terminate: false,
          cancel: false,
          minPrice: 1,
          maxPrice: 100,
          limit: 10,
        },
        results => {
          console.log(results);
        },
      );
    };

    request();
  });

  const onSchedule = async (addressFrom: string, addressTo: string) => {};

  const elements = [{}];

  return (
    <MainResponsiveLayout>
      <TravelMessage
        title={'Busca un ride aqui.'}
        message={'¿A donde quieres ir?'}
      />

      <RideForm
        theme={theme}
        onSearchRequest={onSchedule}
        onCancel={() => navigate('/home/travels')}
      />
    </MainResponsiveLayout>
  );
}

export default RequestRideTravel;
