import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';
import { ItemType } from '@components/navbar/types.ts';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

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
      icon: FaPlus,
    },
    {
      label: 'Notificaciones',
      href: '/',
      current: false,
      icon: FaMessage,
    },
    {
      label: 'Perfil',
      href: '/',
      current: false,
      icon: FaUser,
    },
  ];

  return (
    <>
      <ResponsiveLayout items={items}>
        <p>Hello world</p>
      </ResponsiveLayout>
    </>
  );
}

export default UserMenu;
