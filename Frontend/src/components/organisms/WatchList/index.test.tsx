import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import WatchList from "./index";

describe("WatchList component", () => {
  const watch = [
    {
      datetime: new Date().toString(),
      value: 4584,
    },
  ];
  const data = [
    {
      id: 1,
      icon: "Bitcoin",
      currencyType: "CRYPTO",
      currencyValue: 8345,
      gains: 2.3,
      graphData: watch,
    },
  ];
  it("should have discover assets", () => {
    render(
      <MemoryRouter>
        <WatchList graphDataProp={data} />
      </MemoryRouter>,
    );
    const assets = screen.getAllByTestId("assets");
    expect(assets[0]).toBeInTheDocument();
  });
  it("should have grid icon", () => {
    render(
      <MemoryRouter>
        <WatchList graphDataProp={data} />
      </MemoryRouter>,
    );
    const grid = screen.getAllByTestId("grid");
    expect(grid[0]).toBeVisible();
  });
});
