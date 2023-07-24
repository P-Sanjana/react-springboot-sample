import React from "react";
import { render } from "@testing-library/react";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";
import MyPortfolio from "./index";

const Cards = [
  {
    icon: `${bitcoin}`,
    currencyType: "Bitcoin",
    currencyCode: "BTC",
    currencyValue: "50000.00",
    gains: "+10.5",
    color: `${theme.palette.success.main}`,
  },
];

describe("MyPortfolio Component", () => {
  it("should match snapshot", () => {
    const wrapper = render(
      <MyPortfolio portfolioCards={Cards} totalBalance="$ 14,027.2" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
