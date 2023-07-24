import React from "react";
import { render, screen } from "@testing-library/react";
import CardWithGraph from "./index";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import { chartPoint } from "./index";
import arrow from ".../../../assets/icons/arrow-right-up-line.svg";
import theme from "../../../theme/theme";

describe("CardWithGraph Component", () => {
  const randomDataGenerator = (n: number): chartPoint[] => {
    const data: chartPoint[] = [];
    const now = Date.now();
    for (let i = n; i >= 0; i--) {
      data.push({
        datetime: new Date(now - i * 3600000),
        value: Math.floor(Math.random() * 1000 + 1),
      });
    }
    return data;
  };

  it("should be in document", () => {
    render(
      <CardWithGraph
        arrowIcon={arrow}
        icon={bitcoin}
        currencyType="Bitcoin"
        currencyValue="50000.00"
        gains="+10.5"
        graphData={randomDataGenerator(24)}
        color={theme.palette.success.main}
      ></CardWithGraph>,
    );

    const test1 = screen.queryByTestId("currencyAvatar");
    expect(test1).toBeInTheDocument();
  });
});
