import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import ChangeRateView from ".";

export default {
  title: "molecules/ChangeRateView",
  component: ChangeRateView,
} as Meta;

const Template: Story<ComponentProps<typeof ChangeRateView>> = (args) => (
  <ChangeRateView {...args} />
);

export const Positive = Template.bind({});
Positive.args = {
  changeRate: 3.14,
};

export const Negative = Template.bind({});
Negative.args = {
  changeRate: -0.23,
};

export const Zero = Template.bind({});
Zero.args = {
  changeRate: 0,
};
