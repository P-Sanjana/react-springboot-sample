import { Paper } from "@material-ui/core";
import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import MultiCurrencyChart from ".";

export default {
  title: "molecules/ComparisionChart",
  component: MultiCurrencyChart,
} as Meta;

const Template: Story<ComponentProps<typeof MultiCurrencyChart>> = (args) => (
  <Paper style={{ width: "800px", height: "292px" }}>
    <MultiCurrencyChart {...args} />
  </Paper>
);

export const Single = Template.bind({});
Single.args = {
  xAxisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
  dataArr: [
    {
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [100, 300, 250, 320, 400],
    },
  ],
  showLegends: false,
};

export const Multi = Template.bind({});
Multi.args = {
  xAxisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
  dataArr: [
    {
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [100, 300, 250, 320, 400],
    },
    {
      currencyColor: "#DBC984",
      currencyName: "Dodge Coin",
      data: [50, 80, 76, 90, 150],
    },
  ],
};
