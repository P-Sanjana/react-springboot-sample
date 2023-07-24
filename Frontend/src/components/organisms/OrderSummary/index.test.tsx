import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "./index";
import Wallet from "../../../assets/icons/wallet-2-line.svg";
import { selectedCrypto, balance } from "../../../utils/constants";

describe("OrderSummary Component", () => {
  it("to be in document", () => {
    render(
      <OrderSummary
        cryptoTransactionUnits={0.023451}
        selectedCrypto={selectedCrypto}
        transactionAmount={34000.0}
        transactionFee="1,000.00"
        color="primary"
        payingThroughIcon={Wallet}
        depositToIcon={Wallet}
        transactionTypeButton="Buy now"
        transactionTypeHeader="buying"
        totalBalance={balance}
        error=""
        btnClicked={() => console.log("button clicked")}
      />,
    );

    const test1 = screen.getByTestId("maincontent");
    expect(test1).toBeInTheDocument();
  });
});
