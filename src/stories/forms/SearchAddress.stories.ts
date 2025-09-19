import type { Meta, StoryObj } from '@storybook/react';
import SearchAddressForm from '@components/forms/SearchAddressForm.tsx';

const meta = {
  title: 'Forms/SearchAddress',
  component: SearchAddressForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchAddressForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    theme: 'teal',
  },
};
