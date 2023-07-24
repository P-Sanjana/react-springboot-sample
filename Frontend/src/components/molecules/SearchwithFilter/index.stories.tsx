import React from "react";
import { Story, Meta } from "@storybook/react";
import SearchFilter from "./index";
export default {
  title: "molecules/SearchFilter",
  component: SearchFilter,
} as Meta;

const Template: Story = () => <SearchFilter placeholder="Search all assets" />;

export const searchFilter = Template.bind({});
