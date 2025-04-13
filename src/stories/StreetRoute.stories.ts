import type { Meta, StoryObj } from '@storybook/react';
import StreetRoute from '@components/map/StreetRoute.tsx';

const meta = {
  title: 'Map/StreetRoute',
  component: StreetRoute,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof StreetRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    from: { lat: 20.566131156580823, lng: -103.29118486392122 },
    to: { lat: 20.566963187357228, lng: -103.22847750386998 },
  },
};
