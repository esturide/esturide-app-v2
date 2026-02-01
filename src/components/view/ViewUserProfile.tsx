import React from 'react';
import QRCode from 'react-qr-code';
import HeaderText from '@components/text/HeaderText.tsx';
import UserInput from '@components/input/UserInput.tsx';
import UserProfileResponse from '$libs/request/response/UserProfileResponse.ts';

type Props = {
  profile: UserProfileResponse;
};

const ViewUserProfile = ({ profile }: Props) => {
  return (
    <div className={'flex flex-col gap-2 h-full'}>
      <HeaderText title={'Tu perfil'} weight={1} />

      <div className={'flex flex-col justify-between sm:flex-row gap-2'}>
        <div className={'justify-items-center items-stretch'}>
          <QRCode value={`${profile.code}`} />
        </div>

        <div className={'flex flex-col gap-2 w-full'}>
          <UserInput label={'Codigo'} value={`${profile.code}`} readOnly />

          <UserInput
            label={'Nombres'}
            value={`${profile.firstName}`}
            readOnly
          />

          <UserInput
            label={'Apellidos'}
            value={`${profile.paternalSurname} ${profile.maternalSurname}`}
            readOnly
          />
        </div>
      </div>

      <UserInput label={'Numero'} value={`${profile.phoneNumber}`} readOnly />
      <UserInput label={'Correo'} value={`${profile.email}`} readOnly />
    </div>
  );
};

export default ViewUserProfile;
