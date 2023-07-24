import React from "react";
import MyWallet, { MyWalletProps } from "./index";
import { Story, Meta } from "@storybook/react";
import USDCoin from "../../../assets/coinImage/usdcoin.jpeg";
import { Grid } from "@material-ui/core";

export default {
  title: "Organisms/MyWallet",
  component: MyWallet,
} as Meta;

const Template: Story<MyWalletProps> = (args) => {
  return (
    <Grid item xs={12} sm={4}>
      <MyWallet {...args} />;
    </Grid>
  );
};

export const Wallet = Template.bind({});
Wallet.args = {
  icon: USDCoin,
  currencyType: "USD Coin",
  currencyCode: "US Dollar",
  currencyValue: 34000.0,
};
