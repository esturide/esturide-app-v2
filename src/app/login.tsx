import React from 'react';
import { useNavigate } from 'react-router-dom';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import Logo from '@components/resources/Logo.tsx';
import UserInput from '@components/input/UserInput.tsx';
import Button from '@components/buttons/Button.tsx';
import HyperLink from '@components/input/HyperLink.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const clickRegister = async () => {
    navigate('/register');
  };

  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <div className="flex flex-col items-center mb-4 mx-2 gap-6">
        <UserInput label={'Usuario'} />
        <UserInput label={'Contraseña'} />
      </div>

      <div className="mx-3 my-6">
        <Button label={'Iniciar sesion'} />
      </div>

      <div className="flex flex-col items-center">
        <HyperLink
          label={'¿No tienes cuenta? Regístrate'}
          onClick={clickRegister}
        />
      </div>
    </PresentationLayout>
  );
};

export default LoginPage;
