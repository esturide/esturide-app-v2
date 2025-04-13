import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import Logo from '@components/resources/Logo.tsx';
import UserInput from '@components/input/UserInput.tsx';
import Button from '@components/buttons/Button.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import { isMobileDevice } from '$libs/detectDevice.ts';

const LoginPage: React.FC = () => {
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDesktopDevice(!isMobileDevice());
  }, []);

  const clickRegister = async () => {
    navigate('/register');
  };

  const returnToHome = async () => {
    navigate('/');
  };

  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <div className="flex flex-col items-center mb-4 mx-2 gap-6">
        <UserInput label={'Usuario'} />
        <UserInput label={'Contraseña'} type="password" />
      </div>

      <div className="mx-3 my-6 flex flex-col items-center gap-6">
        <Button label={'Iniciar sesion'} />
        {isDesktopDevice && (
          <Button label={'Regresar'} onClick={returnToHome} />
        )}
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
