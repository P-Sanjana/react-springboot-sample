import React from "react";
import { render, screen } from "@testing-library/react";
import theme from "../../../theme/theme";
import TradeTab from "./index";

describe("TradeTab Component", () => {
  it("should have semantic2 color when change is positive", () => {
    render(
      <TradeTab
        name="Bitcoin"
        price="3,285,553.73"
        change="+1.06%"
        marketCap="60.1T"
        watch={false}
        shortName="BTC"
      />,
    );
    const comp = screen.getByTestId("change");
    expect(comp).toHaveStyle(`color:${theme.palette.success["500"]}`);
  });
  it("should have semantic6 color when change is negative", () => {
    render(
      <TradeTab
        name="Bitcoin"
        price="3,285,553.73"
        change="-1.06%"
        marketCap="60.1T"
        watch={false}
        shortName="BTC"
      />,
    );
    const comp = screen.getByTestId("change");
    expect(comp).toHaveStyle(`color:${theme.palette.error["500"]}`);
  });
  it("should match snapshot", () => {
    const wrapper = render(
      <TradeTab
        name="Bitcoin"
        price="3,285,553.73"
        change="-1.06%"
        marketCap="60.1T"
        watch={false}
        shortName="BTC"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
