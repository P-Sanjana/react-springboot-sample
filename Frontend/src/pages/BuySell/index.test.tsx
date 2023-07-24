import React from "react";
import { render, screen } from "@testing-library/react";
import BuySellPage from "./index";
import { MemoryRouter } from "react-router-dom";
import * as services from "../../services/services";

const totalBal = [
  {
    id: 1,
    currency: "USD",
    wallet: "13001",
  },
  {
    id: 2,
    currency: "Bitcoin",
    wallet: "0.002495143839469646",
  },
];

describe("Buy Sell Page", () => {
  it("should have choose crypto component", () => {
    const spyGetTotalBal = jest.spyOn(services, "getTotalBalance");
    spyGetTotalBal.mockResolvedValue(totalBal);

    render(
      <MemoryRouter>
        <BuySellPage buy={false} />
      </MemoryRouter>,
    );
    const chooseCrypto = screen.getByTestId("chooseCrypto");
    expect(chooseCrypto).toBeInTheDocument();
  });
});
