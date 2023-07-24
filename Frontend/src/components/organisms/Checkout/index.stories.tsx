import React from 'react';
import { Story, Meta } from '@storybook/react';
import CheckoutComponent, { CheckoutProps } from '.';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'organisms/Checkout',
  component: CheckoutComponent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<CheckoutProps> = (args) => {
  return <CheckoutComponent {...args} />;
};

export const check = Template.bind({});
check.args = {
  total: '0.0234510 BTC',
  process: 'buy',
};
