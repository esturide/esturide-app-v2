import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { FaCar } from 'react-icons/fa';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';

import '@styles/map/google-map-style.scss';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { CiCircleCheck, CiCircleRemove, CiTimer } from 'react-icons/ci';
import DraggableDialog from '@components/dialog/DraggableDialog.tsx';
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import { MdCancel, MdIndeterminateCheckBox } from 'react-icons/md';
import SmallButton from '@components/buttons/SmallButton.tsx';

function CurrentLocationMap() {
  const { restoreCurrentTravel, currentSchedule, watchPosition } =
    useTravelManagementContext();
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await restoreCurrentTravel();

      if (!status) {
        console.error('Failure restore current travel.');
      } else {
        console.log('Success request current travel.');
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const CustomMarkerContent = () => {
    return (
      <div className={'bg-white rounded-full p-1.5 shadow-lg'}>
        <FaCar size={28} />
      </div>
    );
  };

  return (
    <GoogleMapView
      center={{
        lat: watchPosition.latitude,
        lng: watchPosition.longitude,
      }}
      apiKey={googleApiKey}
      mapId={googleManagementMapApiKey}
      zoom={3}
      style={{
        height: '100vh',
      }}
    >
      {currentSchedule && (
        <GoogleMapRouting
          origin={currentSchedule.origin.address}
          destination={currentSchedule.destination.address}
          catchNotFoundRoute={() => {}}
        />
      )}
      <AdvancedMarker
        position={{
          lat: watchPosition.latitude,
          lng: watchPosition.longitude,
        }}
        draggable={false}
        clickable={false}
      >
        <CustomMarkerContent />
      </AdvancedMarker>
    </GoogleMapView>
  );
}

function CurrentScheduleTravel() {
  const { currentSchedule } = useTravelManagementContext();
  const { isMobile } = useDeviceManagement();

  if (!currentSchedule) {
    return <Navigate to={'/'} replace />;
  }

  type CurrentTravelDialogProps = {
    draggable?: boolean;
  };

  const CurrentTravelDialog = ({
    draggable = false,
  }: CurrentTravelDialogProps) => {
    const { updateCurrentScheduleTravel, restoreCurrentTravel } =
      useTravelManagementContext();

    const PreviewScheduleTravelInformation = () => {
      return (
        <div className={'flex flex-col gap-2'}>
          <div className={'flex flex-col gap-2'}>
            <UserInputIcon
              value={currentSchedule.origin.address}
              icon={CiCircleCheck}
              readOnly
              disabled
            />
            <UserInputIcon
              value={currentSchedule.destination.address}
              icon={CiCircleRemove}
              readOnly
              disabled
            />
          </div>

          <div className={'flex flex-col gap-2'}>
            {currentSchedule.starting && (
              <UserInputIcon
                value={currentSchedule.starting}
                icon={CiTimer}
                readOnly
                disabled
              />
            )}
          </div>

          <div className={'flex flex-row justify-between gap-2'}>
            <IconButton icon={MdCancel} />
            <IconButton icon={MdIndeterminateCheckBox} />
            <SmallButton
              label={'Iniciar'}
              onClick={async () => {
                const status = await updateCurrentScheduleTravel({
                  starting: new Date(),
                  terminate: false,
                  cancel: false,
                });

                if (status) {
                  await restoreCurrentTravel();
                }
              }}
            />
          </div>
        </div>
      );
    };

    if (draggable) {
      return (
        <DraggableDialog title={'Viaje actual'}>
          <PreviewScheduleTravelInformation />
        </DraggableDialog>
      );
    } else {
      return (
        <FloatingDialog title={'Viaje actual'} style={'solid'}>
          <PreviewScheduleTravelInformation />
        </FloatingDialog>
      );
    }
  };

  return (
    <div className={'flex flex-col h-full'}>
      <CurrentLocationMap />
      <CurrentTravelDialog draggable={!isMobile} />
    </div>
  );
}

export default CurrentScheduleTravel;
