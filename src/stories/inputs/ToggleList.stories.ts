import type { Meta, StoryObj } from '@storybook/react';
import ToggleInputList from '@components/input/list/ToggleInputList.tsx';

const meta = {
  title: 'Input/List/ToggleInputList',
  component: ToggleInputList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ToggleInputList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: '',
    options: [
      { id: 'hombres', label: 'Hombres', defaultValue: false },
      { id: 'mujeres', label: 'Mujeres', defaultValue: false },
    ],
  },
};
