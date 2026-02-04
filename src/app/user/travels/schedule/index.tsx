import { useNavigate } from 'react-router-dom';
import { useUserTheme } from '@/context/UserTheme.tsx';
import ScheduleAddressForm from '@components/forms/ScheduleAddressForm.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { noEmptyStrings } from '$libs/string.ts';
import { failureMessage } from '$libs/toast/failure.ts';
import WeightLayout from '@layouts/WeightLayout.tsx';
import React from 'react';

function RequestScheduleTravel() {
  const navigate = useNavigate();

  const { theme } = useUserTheme();

  const onSchedule = async (addressFrom: string, addressTo: string) => {
    if (noEmptyStrings([addressFrom, addressTo])) {
      navigate('/home/travels/schedule/preview', {
        state: { addressTo: addressTo, addressFrom: addressFrom },
      });
    } else {
      failureMessage('You cannot leave the address empty.');
    }
  };

  return (
    <MainResponsiveLayout>
      <WeightLayout>
        <div className={'relative h-full flex flex-col gap-4'}>
          <TravelMessage
            title={'Establece la ruta.'}
            message={'¿A donde vamos a ir?'}
          />

          <ScheduleAddressForm
            theme={theme}
            onSchedule={onSchedule}
            onCancel={() => navigate('/home/travels')}
          />
        </div>
      </WeightLayout>
    </MainResponsiveLayout>
  );
}

export default RequestScheduleTravel;
