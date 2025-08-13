import type { Meta, StoryObj } from '@storybook/react';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { FaSearch } from 'react-icons/fa';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/UserInputWithIcon',
  component: UserInputIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onClick: async () => {
      fn();
    },
  },
} satisfies Meta<typeof UserInputIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const FullName: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Diego Sealtiel Valderrama Garcia',
  },
};

export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Location',
    icon: FaSearch,
    onClick: async () => {
      fn();
    },
  },
};
