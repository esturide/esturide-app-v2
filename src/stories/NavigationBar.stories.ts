import type { Meta, StoryObj } from '@storybook/react';
import MobileNavigationBar from '@components/navbar/MobileNavigationBar.tsx';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const meta = {
  title: 'NavigationBar',
  component: MobileNavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof MobileNavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
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
    ],
    color: 'green',
  },
};
