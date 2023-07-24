import React from "react";
import { Story, Meta } from "@storybook/react";
import TotalBalance, { TotalBalanceProps } from "./index";
export default {
  title: "molecules/TotalBalance",
  component: TotalBalance,
} as Meta;

const Template: Story<TotalBalanceProps> = (args) => <TotalBalance {...args} />;

export const totalBalance = Template.bind({});
totalBalance.args = {
  totalBalanceValueInBTC: 0.0023034,
  totalBalanceValueInDollar: 13456788999,
};
