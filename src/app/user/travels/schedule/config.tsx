import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import ScheduleTravelForm, {
  CurrentSchedule,
} from '@components/forms/ScheduleTravelForm.tsx';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const { googleApiKey } = useServiceApiManager();

  const onSchedule = async (schedule: CurrentSchedule) => {
    console.log(schedule);
  };

  return (
    <>
      <MainResponsiveLayout reserveSpace>
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
