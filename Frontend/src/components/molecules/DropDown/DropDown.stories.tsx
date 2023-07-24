import React from "react";
import DropDown from "./DropDown";

export default {
  title: "molecules/DropDown",
  component: DropDown,
};
const dropdownList=[
  {
    "key":2,
    "value":2
  },
  { 

    "key":3,
    "value":3
  }
]
export const dropDown = (): React.ReactElement => (
  <DropDown default="2" dropDownList={dropdownList} />
);
