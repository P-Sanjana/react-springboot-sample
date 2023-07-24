import React from "react";
import { render, screen } from "@testing-library/react";
import PortfolioCard from "./index";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";

describe("Portfolio Component", () => {
  it("should match snapshot", () => {
    render(
      <PortfolioCard
        icon={bitcoin}
        currencyCode="BTC"
        currencyType="Bitcoin"
        currencyValue="50000.00"
        gains="10.5"
        color={theme.palette.success.main}
      ></PortfolioCard>,
    );

    const gainsTest = screen.getByTestId("gains");
    expect(gainsTest).toHaveStyle(`color: ${theme.palette.success.main}`);
  });
});
