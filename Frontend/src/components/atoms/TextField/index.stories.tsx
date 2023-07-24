import React from "react";
import MyTextField from '.';

export default {
  title: "atoms/textfield",
  component: MyTextField,
};
export const TextField = (): JSX.Element => <MyTextField variant="outlined" label="Search assests"></MyTextField>;