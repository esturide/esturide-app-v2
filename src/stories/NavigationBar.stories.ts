import type { Meta, StoryObj } from '@storybook/react';
import MobileNavigationBar from '@components/navbar/MobileNavigationBar.tsx';
import { FaHeart, FaHome, FaSearch, FaUser } from 'react-icons/fa';

const meta = {
  title: 'NavigationBar',
  component: MobileNavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof MobileNavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { icon: FaHome, label: 'Home' },
      { icon: FaSearch, label: 'Search' },
      { icon: FaHeart, label: 'Favorites' },
      { icon: FaUser, label: 'Profile' },
    ],
    color: 'green',
  },
};
