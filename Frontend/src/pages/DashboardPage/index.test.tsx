import React from "react";
import { render } from "@testing-library/react";
import DashboardPage from "./index";
import { MemoryRouter } from "react-router";

describe("Dashboard Page", () => {
  it("should have match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
