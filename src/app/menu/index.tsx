import HomeLayout from '@layouts/HomeLayout.tsx';
import { ItemType } from '@components/navbar/types.ts';
import { FaHome } from 'react-icons/fa';

function UserMenu() {
  const items: ItemType[] = [
    {
      label: 'Inicio',
      href: '/',
      current: false,
      icon: FaHome,
    },
    {
      label: 'Viajes',
      href: '/',
      current: false,
    },
    {
      label: 'Notificaciones',
      href: '/',
      current: false,
    },
    {
      label: 'Perfil',
      href: '/',
      current: false,
    },
  ];

  return (
    <>
      <HomeLayout items={items}>
        <p>Hello world</p>
      </HomeLayout>
    </>
  );
}

export default UserMenu;
