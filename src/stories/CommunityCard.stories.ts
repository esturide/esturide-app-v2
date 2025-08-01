import type { Meta, StoryObj } from '@storybook/react';
import CommunityCard from '@components/view/CommunityCard.tsx';

const meta = {
  title: 'Cards/CommunityCard',
  component: CommunityCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof CommunityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    communityName: 'CUT',
    description: 'Comunidad del CUTONALA',
    lastMessageTime: '2:00',
  },
};
