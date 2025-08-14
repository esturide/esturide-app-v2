import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '@components/input/UserInput.tsx';
import Button from '@components/buttons/Button.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import { isMobileDevice } from '$libs/detectDevice.ts';
import { useUserManager } from '@/context/UserManager.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserManager();
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [userCode, setUserCode] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

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
    const num = Number(value);

    if (!isNaN(num)) {
      setUserCode(num);
    }

    console.log(userCode);
  };

  const onLogin = async () => {
    const status = await login(userCode, password);

    if (status) {
      navigate('/home');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4 mx-2 gap-6">
        <UserInput label={'Usuario'} onInput={onInputCode} />
        <UserInput label={'Contraseña'} type="password" onInput={setPassword} />
      </div>

      <div className="mx-3 my-6 flex flex-col items-center gap-6">
        <Button label={'Iniciar sesion'} onClick={onLogin} />
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
    </>
  );
};

export default LoginPage;
