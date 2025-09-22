import { useNavigate } from 'react-router-dom';
import { useUserTheme } from '@/context/UserTheme.tsx';
import ScheduleForm from '@components/forms/ScheduleForm.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import { noEmptyStrings } from '$libs/string.ts';
import { failureMessage } from '$libs/toast/failure.ts';

function ScheduleTravel() {
  const navigate = useNavigate();

  const { theme } = useUserTheme();

  const onSchedule = async (addressFrom: string, addressTo: string) => {
    if (noEmptyStrings([addressFrom, addressTo])) {
      navigate('/home/travels/schedule/preview', {
        state: { addressTo: addressTo, addressFrom: addressFrom },
      });
    } else {
      failureMessage('You cannot leave the address empty.');
    }
  };

  return (
    <MainLayout>
      <div className={'flex flex-col gap-4'}>
        <TravelMessage
          title={'Inicia un viaje aqui.'}
          message={'Programa la ruta.'}
        />

        <ScheduleForm
          theme={theme}
          onSchedule={onSchedule}
          onCancel={() => navigate(-1)}
        />
      </div>
    </MainLayout>
  );
}

export default ScheduleTravel;
