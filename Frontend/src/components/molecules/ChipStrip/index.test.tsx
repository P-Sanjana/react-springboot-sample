import React from "react";

import {
  render,
  RenderResult,
  fireEvent,
  screen,
} from "@testing-library/react";
import CurrencyChipStrip, { CurrencyChipData } from ".";

const testDataStatic: Array<CurrencyChipData> = [
  {
    name: "Bitcoin",
    color: "#F7931A",
    selected: true,
  },
  {
    name: "XRP",
    color: "#222222",
  },
  {
    name: "Polkadot",
    color: "#E6007A",
  },
  {
    name: "Ethereum",
    color: "#627EEA",
  },
  {
    name: "Tether",
    color: "#26A17B",
  },
  {
    name: "Ethereum 2",
    color: "#191971",
  },
  {
    name: "Dodge Coin",
    color: "#DBC984",
  },
];

describe("CurrencyChipStrip molecule component", () => {
  it("should match snapshot", () => {
    const testData = testDataStatic.slice();
    const onClick = (index: number) => {
      console.log(`Selected an item ${index}`);
    };
    const component = render(
      <CurrencyChipStrip data={testData} onClick={onClick} />
    );
    expect(component).toMatchSnapshot();
  });
  it("should highlight the selected", () => {
    let testData = testDataStatic.slice();
    let component: RenderResult | undefined = undefined;
    const onClick = (index: number) => {
      testData = testDataStatic.slice();
      testData[index].selected = !testData[index].selected;
      if (component) {
        component.rerender(
          <CurrencyChipStrip data={testData} onClick={onClick} />
        );
      }
    };
    component = render(<CurrencyChipStrip data={testData} onClick={onClick} />);
    const chipItem = screen.getByTestId(1);
    fireEvent.click(chipItem);
    expect(chipItem).toHaveStyle({
      border: "2px solid",
    });
  });
  it("should scroll when arrows clicked", async () => {
    const testData = testDataStatic.slice();
    const onClick = (index: number) => {
      console.log(`Selected an item ${index}`);
    };
    render(
      <div style={{ width: "400px" }}>
        <CurrencyChipStrip data={testData} onClick={onClick} />
      </div>
    );
    fireEvent.click(screen.getByTestId("scroll-left-button").childNodes[0]);
    await new Promise((r) => setTimeout(r, 1000));
    fireEvent.click(screen.getByTestId("scroll-right-button").childNodes[0]);
    await new Promise((r) => setTimeout(r, 1000));
  });
});
