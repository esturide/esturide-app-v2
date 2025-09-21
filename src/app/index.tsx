import { useNavigate } from 'react-router-dom';

import Welcome from '@components/resources/Welcome.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import { GrLogin, GrUserNew } from 'react-icons/gr';
import { useUserManager } from '@/context/UserManager.tsx';
import { useEffect } from 'react';
import MainLayout from '@layouts/view/MainLayout.tsx';

function UserIndex() {
  const { isAuthenticated } = useUserManager();
  const navigate = useNavigate();

  useEffect(() => {}, [isAuthenticated, navigate]);

  const UserOptions = () => {
    const registerUser = async () => {
      navigate('/login/register');
    };

    const loginUser = async () => {
      navigate('/login');
    };

    return (
      <div className={'flex flex-col md:flex-row gap-4 my-3'}>
        <ButtonCard
          icon={GrUserNew}
          title={'Registrarse'}
          content={'Unete a la comunidad.'}
          color={'bg-blue-300'}
          onClick={registerUser}
        />

        <ButtonCard
          icon={GrLogin}
          title={'Iniciar sesion'}
          content={'Si ya tienes una cuenta.'}
          color={'bg-green-300'}
          onClick={loginUser}
        />
      </div>
    );
  };

  const FirstElement = () => {
    return (
      <div className={'flex flex-col items-start gap-8'}>
        <Welcome dark />
        <UserOptions />
      </div>
    );
  };

  return (
    <MainLayout>
      <FirstElement />
    </MainLayout>
  );
}

export default UserIndex;
