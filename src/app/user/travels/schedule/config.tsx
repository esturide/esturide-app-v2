import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import ScheduleTravelForm from '@components/forms/ScheduleTravelForm.tsx';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const { googleApiKey } = useServiceApiManager();

  return (
    <>
      <MainLayout>
        <div className="h-screen">
          <ScheduleTravelForm
            currentSchedule={{ addressFrom: addressFrom, addressTo: addressTo }}
            onCancel={() => {
              navigate('/home/travels/schedule/');
            }}
          />
        </div>
      </MainLayout>
    </>
  );
}

export default ScheduleConfig;
