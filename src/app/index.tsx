import { useEffect, useState } from 'react';
import { GrLogin, GrUserNew } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { randomIntFromInterval, shuffleArray } from '$libs/random.ts';
import { useUserManager } from '@/context/UserManager.tsx';
import MainLayout from '@layouts/view/MainLayout.tsx';
import Welcome from '@components/resources/Welcome.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import SimpleCarPresentation from '@components/cards/SimpleCarPresentation.tsx';

import CommunityPeople from '@assets/images/resources/community-university.jpeg';
import TravelCar from '@assets/images/resources/travel-car.jpg';
import TravelWoman from '@assets/images/resources/travel-woman.jpg';

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
      <div
        className={'flex flex-col md:flex-row  md:justify-between gap-4 my-3'}
      >
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

  const Images = () => {
    const allImages = [
      <img
        className="h-full md:w-96 object-cover rounded-lg animate-slide-x"
        src={CommunityPeople}
        alt={'University community'}
      />,
      <img
        className="h-full md:w-96 object-cover rounded-lg animate-slide-x"
        src={TravelCar}
        alt={'Car travel'}
      />,
      <img
        className="h-full md:w-96 object-cover rounded-lg animate-slide-x"
        src={TravelWoman}
        alt={'Travel woman'}
      />,
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
      setCurrentImage(randomIntFromInterval(0, allImages.length - 1));
    }, []);

    return <>{allImages[currentImage]}</>;
  };

  const BenefitsCards = () => {
    const allBenefits = [
      <SimpleCarPresentation title={'Conecta. Comparte. Viaja.'}>
        <p className={'font-light text-justify'}>
          Una plataforma simple para encontrar o publicar viajes en coche. Únete
          a miles de personas que ya ahorran y contribuyen al medio ambiente, un
          viaje a la vez. Tu próximo trayecto empieza aquí.
        </p>
      </SimpleCarPresentation>,

      <SimpleCarPresentation title={'Tu viaje ideal te espera.'}>
        <p className={'font-light text-justify'}>
          Encuentra o publica viajes en coche de forma segura y sencilla.
          Descubre la manera más económica de viajar y conecta con una red de
          personas que, como tú, buscan un transporte inteligente y amigable con
          el planeta.
        </p>
      </SimpleCarPresentation>,

      <SimpleCarPresentation
        title={'Únete a la comunidad que transforma cada viaje.'}
      >
        <p className={'font-light text-justify'}>
          Comparte trayectos para ahorrar, conectar con personas y construir un
          futuro más sostenible. Con nosotros, cada kilómetro cuenta para hacer
          del mundo un lugar mejor.
        </p>
      </SimpleCarPresentation>,
    ];

    return (
      <div className={'flex flex-col md:flex-row gap-4'}>
        <div className={'grow'}>
          <Images />
        </div>

        <div className={'flex flex-col gap-4'}>{shuffleArray(allBenefits)}</div>
      </div>
    );
  };

  const WelcomeMessage = () => {
    return (
      <div className={'flex flex-col gap-6'}>
        <div className={'flex flex-col items-start'}>
          <Welcome dark />
        </div>

        <div className={'justify-between items-stretch'}>
          <UserOptions />
        </div>
      </div>
    );
  };

  const ConclusionMessage = () => {
    return (
      <SimpleCarPresentation title={'¡Únete a nuestra comunidad!'}>
        <p className={'font-light text-justify'}>
          Cada trayecto es una oportunidad para ahorrar, cuidar el planeta y
          conectar con personas, haciendo de tus viajes una experiencia más
          inteligente y enriquecedora.
        </p>

        <p className={'font-light text-xl text-right'}>
          Descubre la diferencia de viajar con propósito.
        </p>
      </SimpleCarPresentation>
    );
  };

  return (
    <MainLayout>
      <div className={'flex flex-col gap-8'}>
        <WelcomeMessage />
        <BenefitsCards />
        <ConclusionMessage />
      </div>
    </MainLayout>
  );
}

export default UserIndex;
