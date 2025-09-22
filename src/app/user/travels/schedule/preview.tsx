import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleRouting from '@components/map/google/GoogleRouting.tsx';
import { all } from '$libs/functional.ts';
import { useNavigate } from 'react-router-dom';
import { failureMessage } from '$libs/toast/failure.ts';
import SimpleFloatingDialog from '@components/dialog/SimpleFloatingDialog.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import { FaBackspace } from 'react-icons/fa';

interface LocationState {
  readonly addressFrom: string;
  readonly addressTo: string;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PreviewScheduleTravel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const validDirections = (a: string, b: string) => {
    return all([a, b], d => d.length > 0);
  };

  const catchNotFoundRoute = () => {
    failureMessage('Could not find a route.');
    navigate('/home/travels/schedule/');
  };

  useEffect(() => {
    if (!validDirections(addressTo, addressFrom)) {
      failureMessage('Both addresses are invalid.');
      navigate('/home/travels/schedule/');
    }
  }, [state]);

  const CancelButton = () => {
    return <IconButton icon={FaBackspace} theme={'gray'} />;
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
            <CancelButton />
            <SmallButton label={'Aceptar'} />
          </div>
        </SimpleFloatingDialog>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
