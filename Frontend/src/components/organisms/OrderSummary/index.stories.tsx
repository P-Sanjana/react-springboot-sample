import React from "react";
import { Story, Meta } from "@storybook/react";
import OrderSummary, { OrderSummaryProps } from "./index";
import Wallet from "../../../assets/icons/wallet-2-line.svg";
import BitcoinWallet from "../../../assets/icons/bit-coin-line.svg";
import theme from "../../../theme/theme";
import { balance } from "../../../utils/constants";
import { selectedCrypto } from "../AmountDetails/index.stories";
export default {
  title: "Organisms/OrderSummary",
  component: OrderSummary,
} as Meta;

const Template: Story<OrderSummaryProps> = (args) => <OrderSummary {...args} />;

export const OrderSummaryStory = Template.bind({});
OrderSummaryStory.args = {
  cryptoTransactionUnits: 0.023451,
  selectedCrypto: selectedCrypto,
  transactionAmount: 34000.0,
  transactionFee: "1000.00",
  color: theme.palette.warning.main,
  payingThroughIcon: BitcoinWallet,
  depositToIcon: Wallet,
  transactionTypeButton: "Sell now",
  transactionTypeHeader: "selling",
  error: "",
  btnClicked: () => console.log("button clicked"),
};
