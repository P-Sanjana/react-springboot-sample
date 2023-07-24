import React from "react";
import { render } from "@testing-library/react";
import WalletPage from "./index";
import { MemoryRouter } from "react-router";

describe("Wallet Page", () => {
  it("should have match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <WalletPage />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
