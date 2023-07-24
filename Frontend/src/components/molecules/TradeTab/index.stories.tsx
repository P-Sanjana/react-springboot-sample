import React from "react";
import { Story, Meta } from "@storybook/react";
import TradeTab, { TradeTabProps } from "./index";

export default {
  title: "Molecules/TradeTab",
  component: TradeTab,
} as Meta;

const Template: Story<TradeTabProps> = (args) => <TradeTab {...args} />;

export const Trade = Template.bind({});
Trade.args = {
  name: "Bitcoin",
  price: "3,285,553.73",
  change: "+1.06%",
  marketCap: "60.1T",
  watch: true,
  shortName: "BTC",
};
