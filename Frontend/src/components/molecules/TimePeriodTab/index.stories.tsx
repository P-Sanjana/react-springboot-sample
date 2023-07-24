import React from "react";
import { Story, Meta } from "@storybook/react";
import TimePeriodTab, { TimePeriodTabProps } from "./index";
import { timePeriods } from "../../../utils/constants";

export default {
  title: "Molecules/TimePeriodTab",
  component: TimePeriodTab,
} as Meta;

const Template: Story<TimePeriodTabProps> = (args) => (
  <TimePeriodTab {...args} />
);

export const TimePeriod = Template.bind({});
TimePeriod.args = {
  timePeriods: timePeriods,
  selectedTimePeriod: "1M",
};
