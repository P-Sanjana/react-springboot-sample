import React from "react";
import { Story, Meta } from "@storybook/react";
import WatchList, { WatchListProps } from "./index";
import { Grid } from "@material-ui/core";

export default {
  title: "organisms/WatchList",
  component: WatchList,
} as Meta;

const Template: Story<WatchListProps> = (args) => {
  return (
    <Grid item xs={8}>
      <WatchList {...args} />;
    </Grid>
  );
};
const watch = [
  {
    datetime: new Date().toString(),
    value: 4584,
  },
];
const data = [
  {
    id: 1,
    icon: "Bitcoin",
    currencyType: "CRYPTO",
    currencyValue: 8345,
    gains: 2.3,
    graphData: watch,
  },
];

export const List = Template.bind({});
List.args = {
  graphDataProp: data,
};
