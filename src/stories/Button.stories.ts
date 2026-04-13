import type { Meta, StoryObj } from '@storybook/react';

import SquareButton from '@components/buttons/SquareButton.tsx';

const meta = {
  title: 'Input/Button',
  component: SquareButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SquareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Push me',
  },
};
