import React from "react";
import { Story, Meta } from "@storybook/react";
import CardWithStats, { CardWithStatsProps } from "./index";
import Bitcoin from "../../../../src/assets/coinImage/bitcoin.png"

export default {
  title: "Molecules/CardWithStats",
  component: CardWithStats,
} as Meta;

const Template: Story<CardWithStatsProps> = (args) => (
  <CardWithStats {...args} />
);

export const CardStats = Template.bind({});
CardStats.args = {
  coin: "Bitcoin",
  coinShort: "BTC",
  marketCap: "64.2T",
  vol: "2.9T",
  circulatingSupply: "18.8M",
  changeRate: "8.02%",
  coinIcon:Bitcoin
};
