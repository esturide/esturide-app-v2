import type { Meta, StoryObj } from '@storybook/react';
import UserInput from '@components/input/UserInput.tsx';

const meta = {
  title: 'Input/UserInput',
  component: UserInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof UserInput>;

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

export const Password: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
  },
};
