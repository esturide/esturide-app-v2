import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { MdCancel, MdSupervisedUserCircle } from 'react-icons/md';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import loaderEffect from '$libs/loaderEffect.ts';
import RideData from '$libs/request/response/RideData.ts';
import { useTravelManagementContext } from '@/context/TravelManagementContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import GoogleMapRouting from '@components/map/google/GoogleMapRouting.tsx';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import FloatingDialog from '@components/dialog/FloatingDialog.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import UserInput from '@components/input/UserInput.tsx';
import DraggableDialogImprovement from '@components/dialog/DraggableDialogImprovement.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import HeaderText from '@components/text/HeaderText.tsx';

import '@styles/map/google-map-style.scss';

const CurrentLocationMap = () => {
  const { restoreCurrentTravel, currentSchedule, watchPosition } =
    useTravelManagementContext();
  const { googleApiKey, googleManagementMapApiKey } = useServiceApiManager();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await restoreCurrentTravel();

      if (!status) {
        console.error('Failure restore current travel.');
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
};

function CurrentScheduleTravel() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassengerList, setShowPassengerList] = useState(false);

  const onTogglePassengerList = async () => {
    setShowPassengerList(!showPassengerList);
  };

  const ScheduleTravelInformation = () => {
    const {
      currentSchedule,
      updateCurrentScheduleTravel,
      restoreCurrentTravel,
    } = useTravelManagementContext();

    if (!currentSchedule) {
      return <Navigate to={'/'} replace />;
    }

    const onStartingTravel = async () => {
      await loaderEffect(async () => {
        const status = await updateCurrentScheduleTravel({
          starting: new Date(),
        });

        if (status) {
          await restoreCurrentTravel();
        }
      }, setLoading);
    };

    const onCancel = async () => {
      await loaderEffect(async () => {
        const status = await updateCurrentScheduleTravel({
          cancel: true,
        });

        if (status) {
          await restoreCurrentTravel();
          navigate('/home/travels');
        }
      }, setLoading);
    };

    const onTerminate = async () => {
      await loaderEffect(async () => {
        const status = await updateCurrentScheduleTravel({
          terminate: true,
        });

        if (status) {
          await restoreCurrentTravel();
          navigate('/home/travels');
        }
      }, setLoading);
    };

    const ControlScheduleTravel = () => {
      if (currentSchedule.starting) {
        return (
          <SmallButton
            label={'Terminar'}
            onClick={onTerminate}
            theme={'teal'}
          />
        );
      } else {
        return <SmallButton label={'Iniciar'} onClick={onStartingTravel} />;
      }
    };

    return (
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex flex-row gap-2'}>
            <UserInput
              label={'Origen'}
              value={currentSchedule.origin.address}
              readOnly
            />
            <UserInput
              label={'Destino'}
              value={currentSchedule.destination.address}
              readOnly
            />
          </div>
        </div>

        <div className={'flex flex-row justify-between gap-2'}>
          <IconButton icon={MdCancel} theme={'gray'} onClick={onCancel} />
          <IconButton
            icon={MdSupervisedUserCircle}
            theme={'teal'}
            onClick={onTogglePassengerList}
          />

          <ControlScheduleTravel />
        </div>
      </div>
    );
  };

  const CurrentTravelDialog = () => {
    const { isMobile } = useDeviceManagement();

    if (!isMobile) {
      return (
        <DraggableDialogImprovement>
          <ScheduleTravelInformation />
        </DraggableDialogImprovement>
      );
    } else {
      return (
        <FloatingDialog style={'solid'}>
          <ScheduleTravelInformation />
        </FloatingDialog>
      );
    }
  };

  const ShowAllRides = () => {
    const {
      currentSchedule,
      updateCurrentScheduleTravel,
      restoreCurrentTravel,
    } = useTravelManagementContext();

    if (!currentSchedule) {
      return null;
    }

    const Ride: React.FC<{ ride: RideData }> = ({ ride }) => {
      return (
        <div className={'border border-gray-200 rounded-4xl px-2 pt-2 py-4'}>
          <div className={'flex flex-col gap-2'}>
            <UserInput
              label={'Nombre'}
              value={ride.passenger.firstName}
              readOnly
            />

            <div className={'flex flex-row gap-2'}>
              <UserInput
                label={'Nombre'}
                value={ride.passenger.maternalSurname}
                readOnly
              />
              <UserInput
                label={'Nombre'}
                value={ride.passenger.paternalSurname}
                readOnly
              />
            </div>
          </div>
        </div>
      );
    };

    if (currentSchedule.rides.length === 0) {
      return (
        <div className={'flex flex-col h-full gap-4'}>
          <HeaderText title={'No hay pasajeros'} weight={1} />
          <SmallButton label={'Volver'} onClick={onTogglePassengerList} />
        </div>
      );
    } else {
      return (
        <div className={'flex flex-col h-full gap-4'}>
          <HeaderText title={'Pasajeros abordo'} weight={1} />

          <div className={'flex flex-col gap-2'}>
            {currentSchedule.rides.map(ride => (
              <Ride ride={ride} />
            ))}
          </div>

          <SmallButton label={'Volver'} onClick={onTogglePassengerList} />
        </div>
      );
    }
  };

  if (loading) {
    return (
      <PartialScreenContainer>
        <SpinnerLoader />
      </PartialScreenContainer>
    );
  }

  if (showPassengerList) {
    return (
      <MainResponsiveLayout>
        <ShowAllRides />
      </MainResponsiveLayout>
    );
  }

  return (
    <div className={'flex flex-col h-full'}>
      <CurrentLocationMap />
      <CurrentTravelDialog />
    </div>
  );
}

export default CurrentScheduleTravel;
