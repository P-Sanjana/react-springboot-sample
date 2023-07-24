import React from "react";
import { render } from "@testing-library/react";
import CheckoutPage from "./index";
import { MemoryRouter } from "react-router";

describe("Checkout Page", () => {
  it("should have match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
