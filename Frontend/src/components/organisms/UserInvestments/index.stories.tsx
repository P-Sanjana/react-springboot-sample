import React from "react";
import { Story, Meta } from "@storybook/react";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";
import MyPortfolio, { MyPortfolioProps } from ".";
import { Grid } from "@material-ui/core";

export default {
  title: "organisms/UserInvestments",
  component: MyPortfolio,
} as Meta;

const Template: Story<MyPortfolioProps> = (args) => {
  return (
    <Grid item xs={3}>
      <MyPortfolio {...args} />
    </Grid>
  );
};

export const check = Template.bind({});
const portfolioCards = [
  {
    id: 1,
    userId: 1,
    currencyId: 1,
    investedAmount: 2847384,
    currentAmount: 4484,
    changeRate: 2.4,
  },
];

check.args = {
  portfolioCards,
  totalBalance: 14027.2,
};
