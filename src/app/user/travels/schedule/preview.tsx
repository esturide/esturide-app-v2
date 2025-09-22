import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { failureMessage } from '$libs/toast/failure.ts';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleRouting from '@components/map/google/GoogleRouting.tsx';
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import { noEmptyStrings } from '$libs/string.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';

import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { TbCancel } from 'react-icons/tb';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import DraggableDialog from '@components/dialog/DraggableDialog.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';

function PreviewScheduleTravel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const { googleApiKey } = useServiceApiManager();
  const { isMobile } = useDeviceManagement();

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

  type PreviewRouteDialogProps = {
    draggable?: boolean;
  };

  const PreviewRouteDialog = ({
    draggable = false,
  }: PreviewRouteDialogProps) => {
    const PreviewRouteInformation = () => {
      return (
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
      );
    };

    if (draggable) {
      return (
        <DraggableDialog title={'Visualizacion de ruta'}>
          <PreviewRouteInformation />
        </DraggableDialog>
      );
    } else {
      return (
        <FloatingDialog title={'Visualizacion de ruta'} style={'solid'}>
          <PreviewRouteInformation />
        </FloatingDialog>
      );
    }
  };

  return (
    <>
      <div className={'flex flex-col h-full'}>
        <GoogleMapView
          apiKey={googleApiKey}
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

        <PreviewRouteDialog draggable={!isMobile} />
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
