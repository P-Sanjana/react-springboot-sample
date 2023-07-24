import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DropDown from "./DropDown";

afterEach(cleanup);
describe("Dropdown component", () => {
  it("renders without crashing", () => {
    const dropdownList = [
      {
        "key": 2,
        "value": 2,
      },
      {
        "key": 3,
        "value": 3,
      },
    ];
    const div = document.createElement("div");
    ReactDOM.render(<DropDown default="1" dropDownList={dropdownList} />, div);
  });
});
