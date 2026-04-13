import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loaderEffect from '$libs/effects/loaderEffect.ts';
import UserInput from '@components/input/UserInput.tsx';
import SquareButton from '@components/buttons/SquareButton.tsx';
import AlternativeHyperLink from '@components/text/hyperlinks/AlternativeHyperLink.tsx';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import Scroll from '@layouts/scroll/Scroll.tsx';
import { failureMessage } from '$libs/toast/failure.ts';
import Logo from '@components/resources/Logo.tsx';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import { useUserManagerContext } from '@/context/UserManagementContext.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserManagerContext();

  // const [userCode, setUserCode] = useState<number>(0);
  // const [password, setPassword] = useState<string>('');
  const [isValidCode, setIsValidCode] = useState(true);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  type LoginValues = {
    userCode: string;
    password: string;
  };

  const loginValues = useRef<LoginValues>({
    userCode: '',
    password: '',
  });

  const clickRegister = async () => {
    navigate('/login/register');
  };

  const returnToHome = async () => {
    navigate('/');
  };

  const onLogin = async () => {
    await loaderEffect(async () => {
      const userCode = loginValues.current.userCode;
      const password = loginValues.current.password;

      const userCodeValue = Number(userCode);

      if (isNaN(userCodeValue)) {
        failureMessage('Codigo de usuario invalido.');
      } else {
        if (isValidCode && password.length != 0) {
          const status = await login(userCodeValue, password);

          if (status) {
            navigate('/home', { replace: true });
          } else {
            failureMessage('Datos de usuario invalidos.');
          }

          setIsValidLogin(status);
        } else {
          failureMessage('Rellene los datos.');
        }
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
              onInput={userCode => {
                loginValues.current.userCode = userCode;
              }}
              valid={isValidCode && isValidLogin}
              invalidMessage={isValidCode ? '' : 'Numero de usuario invalido'}
            />
            <UserInput
              label={'Contraseña'}
              type="password"
              onInput={password => {
                loginValues.current.password = password;
              }}
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
