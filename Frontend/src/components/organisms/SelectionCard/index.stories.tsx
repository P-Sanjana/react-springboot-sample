import React from "react";
import { Story, Meta } from "@storybook/react";
import ChooseCrypto, { ChooseCryptoProps } from "./index";
import { cryptos, selectedCrypto } from "../../../utils/constants";
import { Box } from "@material-ui/core";

export default {
  title: "Organisms/SelectionCard",
  component: ChooseCrypto,
} as Meta;

const Template: Story<ChooseCryptoProps> = (args) => (
  <Box width="800px">
    <ChooseCrypto {...args} />
  </Box>
);

export const Crypto = Template.bind({});
Crypto.args = {
  data: cryptos,
  onSelect: (crypto) => console.log(`Selected ${crypto}`),
  selectedCrypto: selectedCrypto,
  title: "Sell Crypto",
};
