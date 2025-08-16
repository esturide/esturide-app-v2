import type { Meta, StoryObj } from '@storybook/react';

import GlassCard from '@components/experimental/GlassCard.tsx';

const meta = {
  title: 'Experimental/GlassCard',
  component: GlassCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
