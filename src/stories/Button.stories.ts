import type { Meta, StoryObj } from '@storybook/react';

import UserButton from '@components/buttons/UserButton.tsx';

const meta = {
  title: 'Input/Button',
  component: UserButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UserButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Push me',
  },
};
