import React from 'react';
import { Story, Meta } from '@storybook/react';
import DeliveryComponent from './index';

export default {
  title: 'Organisms/DeliveryFee',
  component: DeliveryComponent,
} as Meta;

const Template: Story = (args) => {
  return <DeliveryComponent {...args} />;
};

export const check = Template.bind({});
check.args = {

};
