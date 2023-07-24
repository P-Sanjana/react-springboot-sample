import React from "react";
import { render, screen } from "@testing-library/react";
import AboutCrypto from "./index";

describe("AboutCrypto Component", () => {
  it("should match snapshot", () => {
    render(
      <AboutCrypto
        currency="Bitcoin"
        content="The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin."
      ></AboutCrypto>,
    );

    const test1 = screen.getByTestId("currency");
    expect(test1).toBeInTheDocument();

    const test2 = screen.getByTestId("website");
    expect(test2).toBeInTheDocument();
  });
});
