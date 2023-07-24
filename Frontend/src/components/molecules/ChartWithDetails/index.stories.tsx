import { Paper } from "@material-ui/core";
import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import WatchlistItemChart, { WatchlistItemChartPoint } from ".";
import theme from "../../../theme/theme";

export default {
  title: "molecules/ChartWithDetails",
  component: WatchlistItemChart,
} as Meta;

const Template: Story<ComponentProps<typeof WatchlistItemChart>> = (args) => (
  <Paper style={{ width: "400px", height: "150px" }}>
    <WatchlistItemChart {...args} />
  </Paper>
);

const randomDataGenerator = (n: number): WatchlistItemChartPoint[] => {
  const data: WatchlistItemChartPoint[] = [];
  const now = Date.now();
  for (let i = n; i >= 0; i--) {
    data.push({
      datetime: new Date(now - i * 3600000).toString(),
      value: Math.floor(Math.random() * 1000 + 1),
    });
  }
  return data;
};

export const Positive = Template.bind({});
Positive.args = {
  color: theme.palette.success[500],
  data: randomDataGenerator(24),
};

export const Negative = Template.bind({});
Negative.args = {
  color: theme.palette.error[500],
  data: randomDataGenerator(24),
};
