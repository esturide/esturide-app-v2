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
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import { noEmptyStrings } from '$libs/string.ts';
import UserInput from '@components/input/UserInput.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import {
  MdCallReceived,
  MdOutlineTransitEnterexit,
  MdSend,
} from 'react-icons/md';
import { RiSendPlaneLine } from 'react-icons/ri';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { TbCancel } from 'react-icons/tb';

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
        icon={TbCancel}
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
        label={'Confirmar'}
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
      <div className={'flex flex-col h-full'}>
        <GoogleMapView
          apiKey={googleMapsApiKey}
          zoom={1}
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

        <FloatingDialog title={'Visualizacion de ruta'} style={'solid'}>
          <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col gap-2'}>
              <UserInputIcon
                value={addressFrom}
                icon={CiCircleCheck}
                readOnly
                disabled
              />
              <UserInputIcon
                value={addressTo}
                icon={CiCircleRemove}
                readOnly
                disabled
              />
            </div>

            <div className={'flex flex-row justify-between gap-2'}>
              <CancelTravel />
              <AcceptPreviewTravel />
            </div>
          </div>
        </FloatingDialog>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
