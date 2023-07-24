import React from "react";
import { Meta, Story } from "@storybook/react";
import BuySellPage, { BuySellProps } from "./index";

export default {
  title: "Pages/BuySell",
  component: BuySellPage,
} as Meta;

const Template: Story<BuySellProps> = (args) => <BuySellPage {...args} />;

export const BuySell = Template.bind({});
BuySell.args = {
  buy: false,
};
