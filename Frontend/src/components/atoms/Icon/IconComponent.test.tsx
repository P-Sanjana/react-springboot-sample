import React from "react";
import ReactDOM from "react-dom";
import IconComponent from "./IconComponent"
import {  cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../../../assets/icons/dashboard-3-line.svg";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<IconComponent icon={Dashboard} />, div);
});

