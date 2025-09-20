import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaUser } from 'react-icons/fa';
import UserInput from '@components/input/UserInput.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import SelectColor from '@components/input/selector/SelectColor.tsx';
import DateInput from '@components/input/DateInput.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import AlternativeHyperLink from '@components/input/AlternativeHyperLink.tsx';
import Scroll from '@layouts/scroll/Scroll.tsx';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import Logo from '@components/resources/Logo.tsx';

const UserRegister: React.FC = () => {
  const [currentForm, setCurrentForm] = useState(0);
  const navigate = useNavigate();

  const clickRegister = async () => {
    navigate('/login');
  };

  const FirstRegister = () => {
    return (
      <div>
        <UserInput label={'Nombre'} />
        <UserInput label={'Primer apellido'} />
        <UserInput label={'Segundo apellido'} />
        <DateInput label={'Nacimiento'} />
        <UserInput label={'Codigo'} type="number" />
      </div>
    );
  };

  const SecondRegister = () => {
    return (
      <div>
        <UserInput label={'Usuario'} />
        <UserInput label={'Email'} />
        <UserInput label={'Contraseña'} type="password" />
        <UserInput label={'Confirmar contraseña'} type="password" />
      </div>
    );
  };

  const ThirdRegister = () => {
    return (
      <div className={'flex flex-col items-center my-2 gap-3'}>
        <ButtonCard
          title={'Conductor'}
          content={['Solicitar y ofrecer viajes.', 'Registrar vehículos.']}
          icon={FaCar}
          color={'bg-teal-400'}
        />
        <ButtonCard
          title={'Pasajero'}
          content={['Acceder a viajes.', 'Registrar vehiculos mas tarde.']}
          icon={FaUser}
          color={'bg-indigo-300'}
        />
      </div>
    );
  };

  const FirstDriverRegister = () => {
    return (
      <>
        <UserInput label={'Marca'} />
        <UserInput label={'Modelo'} />

        <div className="flex flex-row items-center mb-4 mx-2 gap-6">
          <UserInput label={'Año'} type="number" />
          <UserInput label={'Placas'} type="number" />
        </div>

        <SelectColor label={'Color'} />
      </>
    );
  };

  const registerForm = [
    <FirstRegister />,
    <SecondRegister />,
    <ThirdRegister />,
    <FirstDriverRegister />,
  ];

  const next = async () => {
    setCurrentForm((currentForm + 1) % registerForm.length);
  };

  const previous = async () => {
    setCurrentForm((currentForm - 1) % registerForm.length);
  };

  return (
    <PresentationLayout title={'Registrarse'} header={<Logo />}>
      <div className={'flex flex-col justify-stretch'}>
        <Scroll>
          <div className={'p-2'}>{registerForm[currentForm]}</div>
        </Scroll>

        <div className={'h-fit'}>
          <div className="flex flex-col gap-2 my-3">
            <UserButton label={'Siguente'} onClick={next} />
            {currentForm > 0 && (
              <UserButton
                label={'Regresar'}
                onClick={previous}
                theme={'gray'}
              />
            )}
          </div>

          <div className="flex flex-col items-center">
            <AlternativeHyperLink
              label={'¿Ya tienes cuenta?'}
              onClick={clickRegister}
            />
          </div>
        </div>
      </div>
    </PresentationLayout>
  );
};

export default UserRegister;
