import type { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch from '@components/input/switch/ToggleSwitch.tsx';

const meta = {
  title: 'Input/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Switch toggle',
  },
};
