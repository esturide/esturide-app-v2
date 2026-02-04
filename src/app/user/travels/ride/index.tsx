import React from 'react';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import { useUserTheme } from '@/context/UserTheme.tsx';
import { useNavigate } from 'react-router-dom';
import RideForm from '@components/forms/RideForm.tsx';
import WeightLayout from '@layouts/WeightLayout.tsx';

function RequestRideTravel() {
  const navigate = useNavigate();
  const { theme } = useUserTheme();

  const onSchedule = async (addressFrom: string, addressTo: string) => {
    navigate('/home/travels/ride/preview', {
      state: { addressTo: addressTo, addressFrom: addressFrom },
    });
  };

  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <div className={'relative h-full flex flex-col gap-4'}>
          <TravelMessage
            title={'Busca una ruta.'}
            message={'¿A donde quieres ir?'}
          />

          <RideForm
            theme={theme}
            onSearchRequest={onSchedule}
            onCancel={() => navigate('/home/travels')}
            homeAddress={'Av zoquipan 1109'}
          />
        </div>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default RequestRideTravel;
