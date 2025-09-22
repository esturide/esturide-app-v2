import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import SeatSelectorInput from '@components/input/selector/SeatSelectorInput.tsx';

function ScheduleConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressTo, addressFrom } = state as LocationState;

  return (
    <>
      <MainLayout>
        <div className={''}>
          <p>{addressTo}</p>
          <p>{addressFrom}</p>
          <SeatSelectorInput
            label={'Asientos Disponibles'}
            onSelect={seats => {
              console.log('Selected seats:', seats);
            }}
          />
        </div>
      </MainLayout>
    </>
  );
}

export default ScheduleConfig;
