import type { Meta, StoryObj } from '@storybook/react';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import { FaCar } from 'react-icons/fa';

const meta = {
  title: 'Buttons/ButtonCard',
  component: ButtonCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: FaCar,
    title: 'Conductor',
    content: ['Solicitar y ofrecer viajes.', 'Registrar vehículos.'],
    onClick: async () => {},
    color: 'bg-green-300',
  },
};
