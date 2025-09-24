import React from 'react';
import ScheduleTravelData from '$libs/types/data/ScheduleTravelData.ts';
import UserInput from '@components/input/UserInput.tsx';
import MapRouteCard from '@components/cards/resources/MapRouteCard.tsx';

type Props = {
  schedule: ScheduleTravelData;
  showMap?: boolean;
};

const ScheduleTravelCard = ({ schedule, showMap }: Props) => {
  const driver = schedule.driver;

  return (
    <div className={'p-4 border border-gray-200 rounded-xl shadow-md'}>
      <div className={'flex flex-col md:flex-row gap-4'}>
        <div className={'flex md:flex-col flex-row gap-2 w-full'}>
          <UserInput
            value={`${schedule.price}$`}
            label={'Precio por asiento'}
            type={'number'}
            readOnly
          />
          <UserInput
            value={`${schedule.price}$`}
            label={'Precio por asiento'}
            type={'number'}
            readOnly
          />
        </div>

        {showMap && (
          <MapRouteCard
            addressFrom={'CUCEI'}
            addressTo={'CUTONALA'}
            defaultCenter={driver.position}
            style={{
              height: '25vh',
              width: '100vh',
            }}
            readonly
          />
        )}
      </div>

      <div className={'flex flex-col gap-2'}>
        <UserInput value={driver.firstName} label="Nombres" readOnly />

        <UserInput
          value={`${driver.paternalSurname} ${driver.maternalSurname}`}
          label="Apellidos"
          readOnly
        />
      </div>
    </div>
  );
};

export default ScheduleTravelCard;
