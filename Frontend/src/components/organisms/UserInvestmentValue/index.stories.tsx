import React from "react";
import { Story, Meta } from "@storybook/react";
import PortfolioValue, { PortfolioProps } from ".";
import { Grid } from "@material-ui/core";

const mock = [
  {
    id: 2,
    timePeriod: "1H",
    axisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
    dataArr: [
      {
        index: 0,
        currencyColor: "#F7931A",
        currencyName: "Bitcoin",
        data: [100, 300, 250, 320, 400],
      },
      {
        index: 1,
        currencyColor: "#DBC984",
        currencyName: "Dodge Coin",
        data: [50, 80, 76, 110, 150],
      },
      {
        index: 2,
        currencyColor: "#0052FF",
        currencyName: "Total Investment",
        data: [60, 120, 96, 90, 250],
      },
    ],
    showLegends: false,
  },
  {
    id: 3,
    timePeriod: "24H",
    axisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
    dataArr: [
      {
        index: 0,
        currencyColor: "#F7931A",
        currencyName: "Bitcoin",
        data: [100, 300, 250, 320, 400],
      },
      {
        index: 1,
        currencyColor: "#DBC984",
        currencyName: "Dodge Coin",
        data: [50, 80, 76, 110, 150],
      },
      {
        index: 2,
        currencyColor: "#0052FF",
        currencyName: "Total Investment",
        data: [60, 120, 96, 90, 250],
      },
    ],
    showLegends: false,
  },
];

export default {
  title: "Organisms/UserInvestmentValue",
  component: PortfolioValue,
} as Meta;

const Template: Story<PortfolioProps> = (args) => (
  <Grid item xs={8}>
    <PortfolioValue {...args} />
  </Grid>
);
export const Transactions = Template.bind({});
Transactions.args = {
  data: mock,
  totalInvestment: "63,5858",
  totalGains: "2.3",
};
