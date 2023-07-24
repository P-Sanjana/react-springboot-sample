import { Box } from "@material-ui/core";
import { Meta, Story } from "@storybook/react";
import React from "react";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
import TransactionList, { TransactionListProps } from "./index";
import { transactions } from "../RecentTransactions/index.stories";
export default {
  title: "Organisms/TransactionList",
  component: TransactionList,
} as Meta;

const Template: Story<TransactionListProps> = (args) => (
  <Box style={{ height: "566px", width: "1238px" }}>
    <TransactionList {...args} />
  </Box>
);

export const TransactionListStory = Template.bind({});
TransactionListStory.args = {
  data: transactions,
};
