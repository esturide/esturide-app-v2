import type { Meta, StoryObj } from '@storybook/react';
import VehicleInfoCard from '@components/view/VehicleInfoCard.tsx';

const meta = {
  title: 'Cards/VehicleInfoCard',
  component: VehicleInfoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof VehicleInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    model: 'Audi',
    year: 2011,
    licensePlate: 'JLV687',
    color: 'Blanco',
    onClick: async () => {
      console.log('Touch');
    },
  },
};
