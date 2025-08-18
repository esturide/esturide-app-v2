import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserManager } from '@/context/UserManager.tsx';
import loaderEffect from '$libs/loaderEffect.ts';
import UserInput from '@components/input/UserInput.tsx';
import UserButton from '@components/buttons/UserButton.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import FullscreenContainer from '@components/resources/FullscreenContainer.tsx';
import Scroll from '@layouts/scroll/Scroll.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserManager();
  const { size } = useDeviceManagement();
  const [userCode, setUserCode] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [isValidCode, setIsValidCode] = useState(true);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [loading, setLoading] = useState(false);

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
      if (isValidCode && password.length != 0) {
        const status = await login(userCode, password);

        console.log(`Current status ${status}`);

        if (status) {
          navigate('/home');
        } else {
          toast.error('Datos de usuario invalidos.', {
            position: 'bottom-right',
          });
        }

        setIsValidLogin(status);
      } else {
        toast.error('Rellene los datos.', {
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
      <Scroll>
        <div className="flex flex-col items-center mb-4 mx-2 gap-6">
          <UserInput
            label={'Usuario'}
            onInput={onInputCode}
            valid={isValidCode && isValidLogin}
            invalidMessage={isValidCode ? '' : 'Numero de usuario invalido'}
          />
          <UserInput
            label={'Contraseña'}
            type="password"
            onInput={setPassword}
            valid={isValidLogin}
            invalidMessage={'Contraseña o numero de usuario incorrecto'}
          />
        </div>
      </Scroll>

      <div className="mx-3 my-6 flex flex-col items-center gap-3">
        <UserButton label={'Iniciar sesion'} onClick={onLogin} />
        {['lg', 'lx'].includes(size) && (
          <UserButton
            label={'Regresar'}
            onClick={returnToHome}
            theme={'gray'}
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <HyperLink
          label={'¿No tienes cuenta? Regístrate'}
          onClick={clickRegister}
        />
      </div>
    </>
  );
};

export default LoginPage;
