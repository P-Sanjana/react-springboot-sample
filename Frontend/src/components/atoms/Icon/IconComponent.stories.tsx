import React from "react";
import IconComponent from "./IconComponent";
import Wallet from "../../../assets/icons/wallet-2-line.svg";

export default {
  title: "atoms/IconComponent",
  component: IconComponent,
};
export const wallet = () => <IconComponent icon={Wallet} />;
