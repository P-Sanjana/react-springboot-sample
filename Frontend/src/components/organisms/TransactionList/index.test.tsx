import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionList from "./index";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";

describe("TransactionsList Component", () => {
  const transactions = [
    {
      day: "23",
      statusIcon: CheckLine,
      coin: "Bitcoin",
      symbol: "BTC",
      chipLabel: "Sold",
      coinAmount: "-0.0234510",
      price: "+$34,000.00",
      iconBgColor: `${theme.palette.success["100"]}`,
      month: "June",
      buyer: "Badgley",
    },
    {
      day: "23",
      statusIcon: CheckLine,
      coin: "Bitcoin",
      symbol: "BTC",
      chipLabel: "Sold",
      coinAmount: "-0.0234510",
      price: "+$34,000.00",
      iconBgColor: `${theme.palette.success["100"]}`,
      month: "June",
      buyer: "Badgley",
    },
  ];
  it("to be in document", () => {
    render(<TransactionList data={transactions} />);

    const test1 = screen.getByTestId("transactionslist");
    expect(test1).toBeInTheDocument();
  });
});
