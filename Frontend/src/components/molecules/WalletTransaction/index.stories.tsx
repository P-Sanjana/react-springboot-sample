import React from "react";
import { Story, Meta } from "@storybook/react";
import WalletCard, { WalletCardProps } from "./index";
import ConfirmIcon from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
import { Box } from "@material-ui/core";

export default {
  title: "Molecules/WalletTransaction",
  component: WalletCard,
} as Meta;

const Template: Story<WalletCardProps> = (args) => (
  <Box width="1238px">
    <WalletCard {...args} />
  </Box>
);

export const Wallet = Template.bind({});
Wallet.args = {
  month: "Feb",
  day: "28",
  statusIcon: ConfirmIcon,
  coin: "Bitcoin",
  buyer: "Badgley",
  coinAmount: +0.001,
  price: +900,
  symbol: "BTC",
  iconBgColor: theme.palette.success["100"],
  chipLabel: "Purchased",
};
