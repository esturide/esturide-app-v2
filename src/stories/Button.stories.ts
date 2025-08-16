import type { Meta, StoryObj } from '@storybook/react';

import GenericButton from '@components/buttons/GenericButton.tsx';

const meta = {
  title: 'Input/Button',
  component: GenericButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GenericButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Push me',
  },
};
