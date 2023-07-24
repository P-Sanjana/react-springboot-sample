import { Box, Paper } from "@material-ui/core";
import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import BasicTemplate from ".";
import Footer from "../../molecules/Footer";
import Header from "../../organisms/Header";
import SideNavBar from "../../organisms/SideNavBar/SideNavBar";

export default {
  title: "templates/BasicTemplate",
  component: BasicTemplate,
} as Meta;

const Template: Story<ComponentProps<typeof BasicTemplate>> = (args) => (
  <BasicTemplate {...args} />
);

export const Mock = Template.bind({});
Mock.args = {
  sideNav: (
    <Box style={{ backgroundColor: "#E8E8F7" }} height="100%" width="100%">
      Side Nav
    </Box>
  ),
  header: (
    <Box style={{ backgroundColor: "#B4B4CF" }} height="100%" width="100%">
      Header
    </Box>
  ),
  body: <Paper style={{ height: "250px", margin: "8px" }}>Body</Paper>,
  footer: (
    <Box style={{ backgroundColor: "#627EEA" }} height="100px" width="100%">
      Footer
    </Box>
  ),
};

export const Actual = Template.bind({});
Actual.args = {
  sideNav: <SideNavBar />,
  header: <Header title={"Dashboard"} avatarPicUrl={""} avatarPicAlt={""} />,
  body: <Paper style={{ height: "250px", margin: "8px" }}>Body</Paper>,
  footer: <Footer />,
};
