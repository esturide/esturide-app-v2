import type { Meta, StoryObj } from '@storybook/react';
import ScheduleTravelForm from '@components/forms/ScheduleTravelForm.tsx';

const meta = {
  title: 'Forms/ScheduleTravel',
  component: ScheduleTravelForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ScheduleTravelForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    theme: 'teal',
  },
};
