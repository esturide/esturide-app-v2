import { useNavigate } from 'react-router-dom';

import Welcome from '@components/resources/Welcome.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import { GrLogin, GrUserNew } from 'react-icons/gr';
import { useUserManager } from '@/context/UserManager.tsx';
import { useEffect } from 'react';
import MainLayout from '@layouts/view/MainLayout.tsx';
import SimpleCarPresentation from '@components/cards/SimpleCarPresentation.tsx';
import { shuffleArray } from '$libs/random.ts';

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

  const BenefitsCards = () => {
    const allBenefits = [
      <SimpleCarPresentation title={'Conecta. Comparte. Viaja.'}>
        <p className={'font-light'}>
          Una plataforma simple para encontrar o publicar viajes en coche. Únete
          a miles de personas que ya ahorran y contribuyen al medio ambiente, un
          viaje a la vez. Tu próximo trayecto empieza aquí.
        </p>
      </SimpleCarPresentation>,

      <SimpleCarPresentation title={'Tu viaje ideal te espera.'}>
        <p className={'font-light'}>
          Encuentra o publica viajes en coche de forma segura y sencilla.
          Descubre la manera más económica de viajar y conecta con una red de
          personas que, como tú, buscan un transporte inteligente y amigable con
          el planeta.
        </p>
      </SimpleCarPresentation>,

      <SimpleCarPresentation
        title={'Únete a la comunidad que transforma cada viaje.'}
      >
        <p className={'font-light'}>
          Comparte trayectos para ahorrar, conectar con personas y construir un
          futuro más sostenible. Con nosotros, cada kilómetro cuenta para hacer
          del mundo un lugar mejor.
        </p>
      </SimpleCarPresentation>,
    ];

    return (
      <div className={'flex flex-col gap-8'}>{shuffleArray(allBenefits)}</div>
    );
  };

  const WelcomeMessage = () => {
    return (
      <div className={'flex flex-col items-start gap-6'}>
        <Welcome dark />
        <UserOptions />
      </div>
    );
  };

  return (
    <MainLayout>
      <div className={'flex flex-col gap-8'}>
        <WelcomeMessage />
        <BenefitsCards />
      </div>
    </MainLayout>
  );
}

export default UserIndex;
