import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';

interface LocationState {
  readonly addressFrom: string;
  readonly addressTo: string;
}

function PreviewScheduleTravel() {
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const navigate = useNavigate();

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
