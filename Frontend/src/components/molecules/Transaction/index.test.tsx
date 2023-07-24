import React from "react";
import { render, screen } from "@testing-library/react";
import theme from "../../../theme/theme";
import Transaction from "./index";
import CheckLine from "../../../assets/icons/check-line.svg";

const tran = {
  date: "June 23",
  statusIcon: CheckLine,
  coin: "Bitcoin",
  symbol: "BTC",
  chipLabel: "Sold",
  coinAmount: "-0.0234510",
  price: "+$34,000.00",
  iconBgColor: theme.palette.success.main,
};

describe("Transaction component", () => {
  it("should have currency", () => {
    render(<Transaction {...tran} />);
    const currency = screen.getByTestId("currency");
    expect(currency).toBeInTheDocument();
  });
  it("should match snapshot", () => {
    const wrapper = render(<Transaction {...tran} />);
    expect(wrapper).toMatchSnapshot();
  });
});
