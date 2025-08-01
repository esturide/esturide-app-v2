import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import Logo from '@components/resources/Logo.tsx';
import UserInput from '@components/input/UserInput.tsx';
import Button from '@components/buttons/Button.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import { FaCar, FaUser } from 'react-icons/fa';
import SelectColor from '@components/input/SelectColor.tsx';
import DateInput from '@components/input/DateInput.tsx';

const UserRegister: React.FC = () => {
  const [currentForm, setCurrentForm] = useState(0);
  const navigate = useNavigate();

  const clickRegister = async () => {
    navigate('/login');
  };

  const FirstRegister = () => {
    return (
      <>
        <UserInput label={'Nombre'} />
        <UserInput label={'Primer apellido'} />
        <UserInput label={'Segundo apellido'} />
        <DateInput label={'Nacimiento'} />
        <UserInput label={'Codigo'} type="number" />
      </>
    );
  };

  const SecondRegister = () => {
    return (
      <>
        <UserInput label={'Usuario'} />
        <UserInput label={'Email'} />
        <UserInput label={'Contraseña'} type="password" />
        <UserInput label={'Confirmar contraseña'} type="password" />
      </>
    );
  };

  const ThirdRegister = () => {
    return (
      <>
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
      </>
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

  const nextForm = async () => {
    setCurrentForm((currentForm + 1) % registerForm.length);
  };

  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <div className="flex flex-col items-center mx-2 gap-3">
        {registerForm[currentForm]}
      </div>

      <div className="mx-3 my-6">
        <Button label={'Siguente'} onClick={nextForm} />
      </div>

      <div className="flex flex-col items-center">
        <HyperLink label={'¿Ya tienes cuenta?'} onClick={clickRegister} />
      </div>
    </PresentationLayout>
  );
};

export default UserRegister;
