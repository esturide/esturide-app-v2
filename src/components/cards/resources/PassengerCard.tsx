import React from 'react';
import UserInterface from '$libs/types/interface/UserInterface.ts';
import UserInput from '@components/input/UserInput.tsx';
import MapPositionCard from '@components/cards/resources/MapPositionCard.tsx';

import '@styles/map/google-map-style.scss';

type Props = {
  user: UserInterface;
  showMap?: boolean;
};

const PassengerCard = ({ user, showMap }: Props) => {
  return (
    <div className={'p-4 border border-gray-200 rounded-xl shadow-md'}>
      <div className={'flex flex-col md:flex-row gap-4'}>
        <div className={'flex flex-col gap-2 w-full'}>
          <UserInput value={user.firstName} label="Nombres" readOnly />
          <UserInput
            value={`${user.paternalSurname} ${user.maternalSurname}`}
            label="Apellidos"
            readOnly
          />
        </div>

        {showMap && (
          <MapPositionCard
            position={user.position}
            style={{
              height: '25vh',
              width: '100vh',
            }}
            readonly
          />
        )}
      </div>
    </div>
  );
};

export default PassengerCard;
