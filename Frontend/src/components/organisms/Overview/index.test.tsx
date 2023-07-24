import { render } from "@testing-library/react";
import React from "react";
import CurrencyOverview, { CurrencyOverviewProps } from ".";

describe("CurrencyOverview organism component", () => {
  const props: CurrencyOverviewProps = {
    currentValue: 3285553.73,
    changeRate: 8.2,
    timePeriod: "1M",
    chartXAxisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
    chartData: {
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [100, 300, 250, 320, 400],
    },
    onChangeTimePeriod: (tp) => console.log(`Clicked TimePeriodTab ${tp}`),
  };

  it("should render expected values", () => {
    const wrapper = render(<CurrencyOverview {...props} />);
    expect(wrapper.getByTestId("current-value")).toHaveTextContent(
      "$3,285,553.73"
    );
    expect(wrapper.getByTestId("crv-text")).toHaveTextContent("+8.2%");
  });
});
