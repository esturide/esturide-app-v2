import type { Meta, StoryObj } from '@storybook/react';
import SearchLocation from '@components/input/SearchLocation.tsx';

const meta = {
  title: 'Input/SearchLocation',
  component: SearchLocation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof SearchLocation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
