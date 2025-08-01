import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

import Welcome from '@components/resources/Welcome.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import MainLayoutWithBackground from '@layouts/view/MainLayoutWithBackground.tsx';

import { GrLogin, GrUserNew } from 'react-icons/gr';

function UserIndex() {
  const UserOptions = () => {
    const navigate = useNavigate();

    const registerUser = async () => {
      navigate('/register');
    };

    const loginUser = async () => {
      navigate('/login');
    };

    return (
      <div className={'flex flex-col lg:flex-row gap-4 my-3'}>
        <ButtonCard
          icon={GrUserNew}
          title={'Registrarse'}
          content={'Comienza a solicitar o planificar rides.'}
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

  return (
    <>
      <MainLayoutWithBackground filename={'public/car-animated.gif'}>
        <BrowserView>
          <Welcome />
          <UserOptions />
        </BrowserView>

        <MobileView>
          <Welcome />
          <UserOptions />
        </MobileView>
      </MainLayoutWithBackground>
    </>
  );
}

export default UserIndex;
