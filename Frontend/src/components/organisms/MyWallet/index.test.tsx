import React from "react";
import { render, screen } from "@testing-library/react";
import MyWallet from "./index";
import USDCoin from "../../../assets/coinImage/usdcoin.jpeg";
import { MemoryRouter } from "react-router";

describe("My Wallet component", () => {
  it("should have currency", () => {
    render(
      <MemoryRouter>
        <MyWallet
          icon={USDCoin}
          currencyType="USD Coin"
          currencyCode="US Dollar"
          currencyValue="34000.00"
        />
      </MemoryRouter>,
    );
    const currency = screen.getByTestId("coin");
    expect(currency).toBeInTheDocument();
  });
  it("should match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <MyWallet
          icon={USDCoin}
          currencyType="USD Coin"
          currencyCode="US Dollar"
          currencyValue="34000.00"
        />
      </MemoryRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
