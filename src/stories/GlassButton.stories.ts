import type { Meta, StoryObj } from '@storybook/react';

import GlassButton from '@components/experimental/GlassButton.tsx';

const meta = {
  title: 'Experimental/GlassButton',
  component: GlassButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Push me',
  },
};
