import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SideNavBar from "./SideNavBar";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <SideNavBar />
    </MemoryRouter>,
    div,
  );
});
