import React from "react";
import { Story, Meta } from "@storybook/react";
import PaymentMethod, { PaymentMethodProps } from "./index";

export default {
  title: "organisms/PaymentMethod",
  component: PaymentMethod,
} as Meta;

const Template: Story<PaymentMethodProps> = (args) => (
  <PaymentMethod {...args} />
);
const Template1: Story<PaymentMethodProps> = (args) => (
  <PaymentMethod {...args} />
);
const Template2: Story<PaymentMethodProps> = (args) => (
  <PaymentMethod {...args} />
);
export const totalBalance = Template.bind({});
totalBalance.args = {
  usdOrTotal: "t",
  cardTitle: "Total Balance",
};

export const totalBalanceUsd = Template1.bind({});
totalBalanceUsd.args = {
  usdOrTotal: "u",
  cardTitle: "Payment Method",
};

export const depositTo = Template2.bind({});
depositTo.args = {
  usdOrTotal: "u",
  cardTitle: "Deposit to",
};
