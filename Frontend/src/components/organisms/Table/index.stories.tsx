import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import TradeTable from "./index";
import { selectedCrypto } from "../AmountDetails/index.stories";

export default {
  title: "organisms/Table",
  component: TradeTable,
} as Meta;

const Template: Story<ComponentProps<typeof TradeTable>> = (args) => (
  <TradeTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  setWatch: (di) => console.log(`Set watch ${di}`),
  data: [selectedCrypto],
  onSort: (field, dir) => console.log(`Sort called for ${field} ${dir}`),
};
