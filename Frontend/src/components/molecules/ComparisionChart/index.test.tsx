import { render } from "@testing-library/react";
import React from "react";
import MultiCurrencyChart from ".";

describe("MultiCurrencyChart molecule component", () => {
  const xAxisLabels = ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"];

  const dataArr = [
    {
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [100, 300, 250, 320, 400],
    },
    {
      currencyColor: "#DBC984",
      currencyName: "Dodge Coin",
      data: [50, 80, 76, 90, 150],
    },
  ];
  it("should render without crash", async () => {
    render(
      <MultiCurrencyChart xAxisLabels={xAxisLabels} dataArr={dataArr} />
    );
    // Wait for animation to finish
    await new Promise((r) => setTimeout(r, 2100));
  });
});
