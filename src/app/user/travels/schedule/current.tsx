import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useScheduleTravelManagementContext } from '@/context/ScheduleTravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import DraggableDialogImprovement from '@components/dialog/DraggableDialogImprovement.tsx';

import { useWatchLivePositionContext } from '@/context/WatchLivePositionContext.tsx';

import '@styles/map/google-map-style.scss';
import ScheduleTravelInformation from '@components/forms/driver/ScheduleCurrentForm.tsx';

function CurrentScheduleTravel() {
  const navigate = useNavigate();

  const [showPassengerList, setShowPassengerList] = useState(false);

  const CurrentLocationMap = () => {
    const { watchPosition } = useWatchLivePositionContext();
    const { googleApiKey, googleMapsID } = useServiceApiManager();

    const { currentSchedule, restoreCurrentTravel } =
      useScheduleTravelManagementContext();

    useEffect(() => {
      restoreCurrentTravel();
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
        mapId={googleMapsID}
        zoom={3}
        style={{
          height: '100vh',
        }}
      >
        {currentSchedule && (
          <GoogleMapRouting
            origin={currentSchedule.origin}
            destination={currentSchedule.destination}
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
  };

  const CurrentTravelDialog = () => {
    const { isMobile } = useDeviceManagement();

    if (!isMobile) {
      return (
        <DraggableDialogImprovement style={'glass'}>
          <ScheduleTravelInformation />
        </DraggableDialogImprovement>
      );
    } else {
      return (
        <FloatingDialog style={'glass'}>
          <ScheduleTravelInformation />
        </FloatingDialog>
      );
    }
  };

  return (
    <div className={'flex flex-col h-full'}>
      <CurrentLocationMap />
      <CurrentTravelDialog />
    </div>
  );
}

export default CurrentScheduleTravel;
