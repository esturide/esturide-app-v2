import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';

type RouteParams = {
  readonly addressFrom: string;
  readonly addressTo: string;
};

function PreviewScheduleTravel() {
  const { addressTo, addressFrom } = useParams<RouteParams>();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(addressTo);
    console.log(addressFrom);
  }, [navigate]);

  const onSchedule = async (addressFrom: string, addressTo: string) => {
    navigate('/home/travels/schedule/config', {
      state: { addressTo: addressTo, addressFrom: addressFrom },
    });
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <TravelMessage
        title={'Revisa tu viaje.'}
        message={'Que la ruta sea correcta.'}
      />
    </div>
  );
}

export default PreviewScheduleTravel;
