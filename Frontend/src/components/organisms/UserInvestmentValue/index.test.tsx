import React from "react";
import { render } from "@testing-library/react";
import PortfolioValue from ".";

describe("Portfolio Value Component", () => {
  it("should match snapshot", () => {
    const wrapper = render(<PortfolioValue />);
    expect(wrapper).toMatchSnapshot();
  });
});
