import React from "react";
import { Story, Meta } from "@storybook/react";
import RecentTransactions, { RecentTransactionsProps } from "./index";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
import { Grid } from "@material-ui/core";

export default {
  title: "Organisms/RecentTransactions",
  component: RecentTransactions,
} as Meta;

export const transactions = [
  {
    id: 1,
    userId: 1,
    walletId: 1,
    currencyId: 1,
    currencyName: "Bitcoin",
    currencyCode: "BTC",
    type: "CRYPTO",
    status: "PENDING",
    currencyAmount: 34784,
    amount: 48348,
    participantName: "JOHN",
    datetime: "June 23",
  },
];

const Template: Story<RecentTransactionsProps> = (args) => (
  <Grid item xs={4}>
    <RecentTransactions {...args} />
  </Grid>
);
export const Transactions = Template.bind({});
Transactions.args = {
  data: transactions,
};
