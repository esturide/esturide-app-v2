import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '@components/buttons/IconButton.tsx';
import { FaAddressBook } from 'react-icons/fa';

const meta = {
  title: 'Input/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: FaAddressBook,
  },
};
