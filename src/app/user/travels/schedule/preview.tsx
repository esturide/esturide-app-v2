import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { FaBackspace } from 'react-icons/fa';
import { failureMessage } from '$libs/toast/failure.ts';
import {
  LocationState,
  useScheduleTravel,
} from '@/context/ScheduleTravelContext.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleRouting from '@components/map/google/GoogleRouting.tsx';
import SimpleFloatingDialog from '@components/dialog/SimpleFloatingDialog.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import { noEmptyStrings } from '$libs/string.ts';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PreviewScheduleTravel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const catchNotFoundRoute = () => {
    failureMessage('Could not find a route.');
    navigate('/home/travels/schedule/');
  };

  useEffect(() => {
    if (!noEmptyStrings([addressTo, addressFrom])) {
      failureMessage('Both addresses are invalid.');
      navigate('/home/travels/schedule/');
    }
  }, [state]);

  const CancelTravel = () => {
    return (
      <IconButton
        icon={FaBackspace}
        theme={'gray'}
        onClick={() => {
          navigate('/home/travels/schedule/');
        }}
      />
    );
  };

  const AcceptPreviewTravel = () => {
    return (
      <SmallButton
        label={'Aceptar'}
        onClick={async () => {
          navigate('/home/travels/schedule/config', {
            state: { addressTo: addressTo, addressFrom: addressFrom },
          });
        }}
      />
    );
  };

  return (
    <>
      <div className={'flex'}>
        <GoogleMapView
          apiKey={googleMapsApiKey}
          zoom={3}
          center={{
            lat: 20.566646720860327,
            lng: -103.22860101349919,
          }}
          style={{
            height: '100vh',
          }}
        >
          <GoogleRouting
            origin={addressTo}
            destination={addressFrom}
            catchNotFoundRoute={catchNotFoundRoute}
          />
        </GoogleMapView>

        <SimpleFloatingDialog title={'¿Es correcta la ruta?'} style={'glass'}>
          <div className={'flex flex-row justify-between gap-2'}>
            <CancelTravel />
            <AcceptPreviewTravel />
          </div>
        </SimpleFloatingDialog>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
