import React from "react";
import { render } from "@testing-library/react";
import Text from "./index";

describe("Checkout Page", () => {
  it("should have match snapshot", () => {
    const wrapper = render(<Text variant="h1">Test</Text>);

    expect(wrapper).toMatchSnapshot();
  });
});
