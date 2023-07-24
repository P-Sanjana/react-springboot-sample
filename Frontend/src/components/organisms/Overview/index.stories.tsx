import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import CurrencyOverview from ".";

export default {
  title: "organisms/Overview",
  component: CurrencyOverview,
} as Meta;

const Template: Story<ComponentProps<typeof CurrencyOverview>> = (args) => (
  <CurrencyOverview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentValue: 3285553.73,
  changeRate: 8.2,
  timePeriod: "1M",
  chartXAxisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
  chartData: {
    currencyColor: "#F7931A",
    currencyName: "Bitcoin",
    data: [100, 300, 250, 320, 400],
  },
  onChangeTimePeriod: (tp) => console.log(`Clicked TimePeriodTab ${tp}`),
};
