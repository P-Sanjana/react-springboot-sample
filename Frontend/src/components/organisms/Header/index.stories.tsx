import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import Header from ".";

export default {
  title: "organisms/Header",
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Dashboard",
  avatarPicUrl:
    "https://s3-alpha-sig.figma.com/img/973c/8b4c/05e06771ca57ec378072223b93fc6007?Expires=1635724800&Signature=LoSuQuAoiSGeFs04cT-kZICbfCNVFSd~jnfp6ffpCUDjKiWkq9dvi61je-5x7~toH3IMbNrCQrfctP-mrlVh~H7iAF-UlMNO66--TqlXExfb91MLGLnuK8O5HONWoVL0cT9Zxqx0iBMifwRo8oY~3f45YVs52Kw2FH8LwZxbYDhZCAev85Kqk7yofawgrWgZoYQJTaS~Re4TV09PF56F4wCcbZm81XaIgCbPDF2vZg~ybhPfMAeUf18TseFlsLPU1tbCigTOF3rPjeU5bSQvaBwJrDSGNUkeEdHxpfqfV4CihwWdxdXms67T5IcnBDlMR~AzVGJL~KIiu4lLZ~Fh5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  avatarPicAlt: "John Deere",
};
