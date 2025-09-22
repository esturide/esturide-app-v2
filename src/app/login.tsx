import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserManager } from '@/context/UserManager.tsx';
import loaderEffect from '$libs/loaderEffect.ts';
import UserInput from '@components/input/UserInput.tsx';
import SquareButton from '@components/buttons/SquareButton.tsx';
import AlternativeHyperLink from '@components/text/hyperlinks/AlternativeHyperLink.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import Scroll from '@layouts/scroll/Scroll.tsx';
import { useDeviceManagement } from '@/context/DeviceManagment.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import Logo from '@components/resources/Logo.tsx';
import PresentationLayout from '@layouts/PresentationLayout.tsx';

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

        if (status) {
          navigate('/home', { replace: true });
        } else {
          failureMessage('Datos de usuario invalidos.');
        }

        setIsValidLogin(status);
      } else {
        failureMessage('Rellene los datos.');
      }
    }, setLoading);
  };

  if (loading) {
    return (
      <PartialScreenContainer>
        <SpinnerLoader />
      </PartialScreenContainer>
    );
  }

  return (
    <PresentationLayout title={'Iniciar sesion'} header={<Logo />}>
      <div className={'flex flex-col md:gap-12 gap-2'}>
        <Scroll>
          <div className="flex flex-col items-center gap-2 p-2">
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

        <div className={'flex flex-col gap-3'}>
          <div className="flex flex-col items-center gap-3">
            <SquareButton label={'Iniciar sesion'} onClick={onLogin} />
            <SquareButton
              label={'Regresar'}
              onClick={returnToHome}
              theme={'gray'}
            />
          </div>

          <div className="flex flex-col items-center">
            <AlternativeHyperLink
              label={'¿No tienes cuenta? Regístrate'}
              onClick={clickRegister}
            />
          </div>
        </div>
      </div>
    </PresentationLayout>
  );
};

export default LoginPage;
