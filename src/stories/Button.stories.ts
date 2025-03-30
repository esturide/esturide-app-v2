import type { Meta, StoryObj } from '@storybook/react';

import Button from '@components/buttons/Button.tsx';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Push me',
  },
};
