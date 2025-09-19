import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loaderEffect from '$libs/loaderEffect.ts';
import { useUserTheme } from '@/context/UserTheme.tsx';
import FullScreenContainer from '@layouts/container/FullScreenContainer.tsx';
import CenterElementsLayouts from '@layouts/container/CenterElementsLayouts.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import ScheduleForm from '@components/forms/ScheduleForm.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';

function ScheduleTravel() {
  const navigate = useNavigate();

  const { theme } = useUserTheme();

  const [loadingAddress, setLoadingAddress] = useState(false);

  const onSchedule = async (addressFrom: string, addressTo: string) => {
    await loaderEffect(async () => {
      console.log(`Address from ${addressFrom}, to ${addressTo}`);
    }, setLoadingAddress);

    navigate('/home/travels/schedule/preview', {
      state: { addressTo: addressTo, addressFrom: addressFrom },
    });
  };

  if (loadingAddress) {
    return (
      <FullScreenContainer>
        <CenterElementsLayouts>
          <SpinnerLoader />
        </CenterElementsLayouts>
      </FullScreenContainer>
    );
  }

  return (
    <MainLayout>
      <div className={'flex flex-col gap-4'}>
        <TravelMessage
          title={'Inicia un viaje aqui.'}
          message={'Programa la ruta.'}
        />

        <ScheduleForm
          theme={theme}
          onSchedule={onSchedule}
          onCancel={() => navigate(-1)}
        />
      </div>
    </MainLayout>
  );
}

export default ScheduleTravel;
