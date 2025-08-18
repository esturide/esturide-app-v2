import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '@components/input/UserInput.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import { isMobileDevice } from '$libs/detectDevice.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import FullscreenContainer from '@components/resources/FullscreenContainer.tsx';
import addNotification from 'react-push-notification';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserManager();
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [userCode, setUserCode] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [isValidCode, setIsValidCode] = useState(true);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsDesktopDevice(!isMobileDevice());
  }, []);

  const clickRegister = async () => {
    navigate('/login/register');
  };

  const returnToHome = async () => {
    navigate('/');
  };

  const onInputCode = (value: string) => {
    if (value.length != 0) {
      const num = Number(value);

      if (!isNaN(num)) {
        setIsValidCode(num > 0);
        setUserCode(num);
      } else {
        setIsValidCode(false);
      }
    } else {
      setIsValidCode(true);
    }
  };

  const onLogin = async () => {
    await loaderEffect(async () => {
      if (isValidCode) {
        const status = await login(userCode, password);

        if (status) {
          navigate('/home');
        }

        setIsValidLogin(status);
      } else {
        toast.error('Datos de usuario invalidos.', {
          position: 'bottom-right',
        });
      }
    }, setLoading);
  };

  if (loading) {
    return (
      <FullscreenContainer>
        <SpinnerLoader />
      </FullscreenContainer>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center mb-4 mx-2 gap-6">
        <UserInput
          label={'Usuario'}
          onInput={onInputCode}
          valid={isValidCode}
          invalidMessage={'Numero de usuario invalido'}
        />
        <UserInput
          label={'Contraseña'}
          type="password"
          onInput={setPassword}
          valid={isValidLogin}
          invalidMessage={'Contraseña o numero de usuario incorrecto'}
        />
      </div>

      <div className="mx-3 my-6 flex flex-col items-center gap-6">
        <UserButton label={'Iniciar sesion'} onClick={onLogin} />
        {isDesktopDevice && (
          <UserButton label={'Regresar'} onClick={returnToHome} />
        )}
      </div>

      <div className="flex flex-col items-center">
        <HyperLink
          label={'¿No tienes cuenta? Regístrate'}
          onClick={clickRegister}
        />
      </div>
    </>
  );
};

export default LoginPage;
