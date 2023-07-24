import { Paper } from "@material-ui/core";
import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import CurrencyChipStrip from ".";

export default {
  title: "molecules/ChipStrip",
  component: CurrencyChipStrip,
} as Meta;

const Template: Story<ComponentProps<typeof CurrencyChipStrip>> = (args) => (
  <Paper style={{ width: "1000px", padding: "4px 16px" }}>
    <CurrencyChipStrip {...args} />
  </Paper>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      name: "Bitcoin",
      color: "#F7931A",
      selected: true,
    },
    {
      name: "XRP",
      color: "#222222",
    },
    {
      name: "Polkadot",
      color: "#E6007A",
    },
    {
      name: "Ethereum",
      color: "#627EEA",
    },
    {
      name: "Tether",
      color: "#26A17B",
    },
    {
      name: "Ethereum 2",
      color: "#191971",
    },
    {
      name: "Dodge Coin",
      color: "#DBC984",
    },
  ],
  onClick: (index) => {
    console.log(`Selected ${index}`);
  },
};
