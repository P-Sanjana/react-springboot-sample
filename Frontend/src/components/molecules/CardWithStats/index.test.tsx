import React from "react";
import { render, screen } from "@testing-library/react";
import CardWithStats from "./index";
import Bitcoin from "../../../../src/assets/coinImage/bitcoin.png";

describe("CardWithStata component", () => {
  it("should have three stats", () => {
    render(
      <CardWithStats
        coin="Bitcoin"
        coinShort="BTC"
        marketCap="64.2T"
        vol="2.9T"
        circulatingSupply="18.8M"
        changeRate="+8.01%"
        coinIcon={Bitcoin}
      />,
    );
    const marketCap = screen.getByTestId("market-cap");
    expect(marketCap).toBeInTheDocument();
    const vol = screen.getByTestId("vol");
    expect(vol).toBeInTheDocument();
    const circulatingSupply = screen.getByTestId("circulating-supply");
    expect(circulatingSupply).toBeInTheDocument();
  });
  it("should have button content added to watchlist", () => {
    render(
      <CardWithStats
        coin="Bitcoin"
        coinShort="BTC"
        marketCap="64.2T"
        vol="2.9T"
        circulatingSupply="18.8M"
        changeRate="+8.01%"
        coinIcon={Bitcoin}
      />,
    );
    const btnText = screen.getByTestId("btn");
    expect(btnText).toHaveTextContent("ADDED TO WATCHLIST");
  });
});
