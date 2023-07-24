import React from "react";
import { render, screen } from "@testing-library/react";
import theme from "../../../theme/theme";
import RecentTransactions from "./index";
import CheckLine from "../../../assets/icons/check-line.svg";

const transactions = [
  {
    id: 1,
    userId: 1,
    walletId: 1,
    currencyId: 1,
    currencyName: "Bitcoin",
    currencyCode: "BTC",
    type: "CRYPTO",
    status: "PENDING",
    currencyAmount: 34784,
    amount: 48348,
    participantName: "JOHN",
    datetime: "June 23",
  },
];

describe("Recent transactions organism", () => {
  it("shoud have status icon", () => {
    render(<RecentTransactions data={transactions} />);
    const status = screen.getAllByTestId("status");
    expect(status[0]).toBeInTheDocument();
  });
  it("should have legitimate date", () => {
    render(<RecentTransactions data={transactions} />);
    const date = screen.getAllByTestId("date");
    expect(date[0]).toBeTruthy();
  });
});
