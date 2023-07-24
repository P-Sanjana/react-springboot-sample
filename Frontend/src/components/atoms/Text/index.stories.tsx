import { Story, Meta } from "@storybook/react";
import React from "react";
import Text, { TextProps, CaptionText } from "./index";

export default {
  title: "atoms/Typography",
  component: Text,
} as Meta;

const Template: Story<TextProps> = (args) => <Text {...args} />;

const CaptionTemplate: Story<TextProps> = (args) => <CaptionText {...args} />;

export const Heading4 = Template.bind({});
Heading4.args = {
  variant: "h4",
  children: "Heading 4",
};

export const Heading6 = Template.bind({});
Heading6.args = {
  variant: "h6",
  children: "Heading 6",
};

export const Subtitle1 = Template.bind({});
Subtitle1.args = {
  variant: "subtitle1",
  children: "Subtitle 1",
};

export const Subtitle2 = Template.bind({});
Subtitle2.args = {
  variant: "subtitle2",
  children: "Subtitle 2",
};

export const Body1 = Template.bind({});
Body1.args = {
  variant: "body1",
  children: "Body 1",
};

export const Body2 = Template.bind({});
Body2.args = {
  variant: "body2",
  children: "Body 2",
};

export const Button = Template.bind({});
Button.args = {
  variant: "button",
  children: "Button ",
};

export const Caption1 = Template.bind({});
Caption1.args = {
  variant: "caption",
  children: "Caption 1",
};

export const Caption2 = CaptionTemplate.bind({});
Caption2.args = {
  variant: "caption",
  children: "Caption 2",
};

export const Overline = Template.bind({});
Overline.args = {
  variant: "overline",
  children: "Overline",
};
