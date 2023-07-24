import React from "react";
import PortfolioCard from "./index";
import { PortfolioCardProps } from "./index";
import { Story, Meta } from "@storybook/react";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";
import { Box } from "@material-ui/core";

export default {
  title: "molecules/CardWithInvestDetails",
  component: PortfolioCard,
} as Meta;

const Template: Story<PortfolioCardProps> = (args) => (
  <Box width="398px">
    <PortfolioCard {...args} />
  </Box>
);

export const Portfolio = Template.bind({});
Portfolio.args = {
  icon: `${bitcoin}`,
  currencyType: "Bitcoin",
  currencyCode: "BTC",
  currencyValue: 50000.0,
  gains: 10.5,
  color: `${theme.palette.success.main}`,
};
