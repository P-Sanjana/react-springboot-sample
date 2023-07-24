import React from 'react';
import { Typography } from '@material-ui/core';
import TooltipComponent, { TooltipProps } from '.';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'atoms/Tooltip',
  component: TooltipComponent,
} as Meta;

const Template: Story<TooltipProps> = (args) => {
  return <TooltipComponent {...args} />;
};

export const check = Template.bind({});
check.args = {
  title: 'check',
  placement: 'right',
  arrow: true,
  children: (
    <Typography variant='h6' style={{ width: '70px' }}>
      Tooltip
    </Typography>
  ),
};
