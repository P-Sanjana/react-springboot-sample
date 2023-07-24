import React from "react";
import { Story, Meta } from "@storybook/react";
import Transaction, { TransactionProps } from "./index";
import theme from "../../../theme/theme";
import CheckLine from "../../../assets/icons/check-line.svg";
import { Grid } from "@material-ui/core";

export default {
  title: "Molecules/Transaction",
  component: Transaction,
} as Meta;

const Template: Story<TransactionProps> = (args) => (
  <Grid item xs={4}>
    <Transaction {...args} />
  </Grid>
);

export const CardStats = Template.bind({});
CardStats.args = {
  date: "June 23",
  statusIcon: CheckLine,
  coin: "Bitcoin",
  symbol: "BTC",
  chipLabel: "Sold",
  coinAmount: -0.023451,
  price: +34000.0,
  iconBgColor: theme.palette.success["100"],
};
