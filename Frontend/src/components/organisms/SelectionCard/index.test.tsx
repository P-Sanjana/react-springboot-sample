import React from "react";
import { render, screen } from "@testing-library/react";
import ChooseCrypto from "./index";
import { cryptos, selectedCrypto } from "../../../utils/constants";

describe("Choose cryto component", () => {
  it("should have list of cryptos", () => {
    const test = jest.fn();
    render(
      <ChooseCrypto
        data={cryptos}
        onSelect={test}
        selectedCrypto={selectedCrypto}
        title="Buy Crypto"
      />,
    );

    const container = screen.getByTestId("list");
    expect(container).toBeInTheDocument();
  });
});
