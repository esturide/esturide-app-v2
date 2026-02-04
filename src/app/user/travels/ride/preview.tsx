import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { LocationAddressParams } from '@/context/ScheduleTravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import React, { useEffect } from 'react';
import { noEmptyStrings } from '$libs/string.ts';
import IconButton from '@components/buttons/IconButton.tsx';
import { TbCancel } from 'react-icons/tb';
import SmallButton from '@components/buttons/SmallButton.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import DraggableDialogImprovement from '@components/dialog/DraggableDialogImprovement.tsx';
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';

function PreviewRideTravel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationAddressParams;

  const { googleApiKey, googleMapsID } = useServiceApiManager();
  const { isMobile } = useDeviceManagement();

  const catchNotFoundRoute = () => {
    failureMessage('Could not find a route.');
    navigate('/home/travels/ride/');
  };

  useEffect(() => {
    if (!noEmptyStrings([addressTo, addressFrom])) {
      navigate('/home/travels/ride/');
    }
  }, [state]);

  const CancelTravel = () => {
    return (
      <IconButton
        icon={TbCancel}
        theme={'gray'}
        onClick={() => {
          navigate('/home/travels/ride/');
        }}
      />
    );
  };

  const AcceptPreviewTravel = () => {
    return (
      <SmallButton
        theme={'indigo'}
        label={'Confirmar'}
        onClick={async () => {
          navigate('/home/travels/ride/config', {
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
        <DraggableDialogImprovement title={'Visualizacion de ruta'}>
          <PreviewRouteInformation />
        </DraggableDialogImprovement>
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
    <div className={'flex flex-col h-full'}>
      <GoogleMapView
        apiKey={googleApiKey}
        mapId={googleMapsID}
        zoom={1}
        center={{
          lat: 20.566646720860327,
          lng: -103.22860101349919,
        }}
        style={{
          height: '100vh',
        }}
      >
        <GoogleMapRouting
          origin={addressTo}
          destination={addressFrom}
          catchNotFoundRoute={catchNotFoundRoute}
        />
      </GoogleMapView>

      <PreviewRouteDialog draggable={!isMobile} />
    </div>
  );
}

export default PreviewRideTravel;
