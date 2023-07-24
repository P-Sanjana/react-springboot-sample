import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer from '.';

export default {
  title: 'Molecules/Footer',
  component: Footer,
} as Meta;

const Template: Story = (args) => {
  return <Footer {...args} />;
};

export const base = Template.bind({});
base.args = {

};
