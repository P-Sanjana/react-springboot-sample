import React from "react";
import CardWithGraph, { chartPoint } from "./index";
import { CardWithGraphProps } from "./index";
import { Story, Meta } from "@storybook/react";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";
import arrow from "../../../assets/icons/arrow-right-up-line.svg";
import { Grid } from "@material-ui/core";
import { watchlistChart } from "../../../pages/DashboardPage";

export default {
  title: "molecules/CardWithGraph",
  component: CardWithGraph,
} as Meta;

const randomDataGenerator = (n: number): chartPoint[] => {
  const data: chartPoint[] = [];
  const now = Date.now();
  for (let i = n; i >= 0; i--) {
    data.push({
      datetime: new Date(now - i * 3600000),
      value: Math.floor(Math.random() * 1000 + 1),
    });
  }
  return data;
};

const Template: Story<watchlistChart> = (args) => (
  <Grid item xs={4}>
    <CardWithGraph {...args} />
  </Grid>
);

export const Portfolio = Template.bind({});
Portfolio.args = {
  id: 1,
  icon: `${bitcoin}`,
  currencyType: "Bitcoin",
  currencyValue: 50000.0,
  gains: +10.5,
  graphData: [{ datetime: new Date().toString(), value: 100 }],
};
