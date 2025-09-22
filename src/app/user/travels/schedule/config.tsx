import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { TbCancel } from 'react-icons/tb';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import { useServiceApiManager } from '@/context/ServiceApiKeyManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import SeatSelectorInput from '@components/input/selector/SeatSelectorInput.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import HeaderText from '@components/text/HeaderText.tsx';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  const { googleApiKey } = useServiceApiManager();

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
    return <SmallButton label={'Planificar'} onClick={async () => {}} />;
  };

  return (
    <>
      <MainLayout>
        <div className={'h-screen overflow-y-auto'}>
          <div className={'flex flex-col gap-6 px-2'}>
            <HeaderText title={'Ultimos detalles'} weight={1} />

            <div
              className={
                'flex flex-col md:flex-row gap-2 justify-between items-stretch'
              }
            >
              <div className={'flex flex-col gap-2 w-full'}>
                <HeaderText title={'Verifica ruta'} weight={2} />

                <UserInputIcon
                  label={'Inicio'}
                  value={addressFrom}
                  icon={CiCircleCheck}
                  readOnly
                />
                <UserInputIcon
                  label={'Fin'}
                  value={addressTo}
                  icon={CiCircleRemove}
                  readOnly
                />
              </div>

              <div className={'flex flex-col gap-2 w-full'}>
                <HeaderText title={'Configuracion'} weight={2} />

                <SeatSelectorInput
                  onSelect={seats => {
                    console.log('Selected seats:', seats);
                  }}
                />
              </div>
            </div>

            <div className={'flex flex-row justify-between gap-2'}>
              <CancelTravel />
              <AcceptPreviewTravel />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default ScheduleConfig;
