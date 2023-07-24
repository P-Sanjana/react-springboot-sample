import React from "react";
import { render, screen } from "@testing-library/react";
import TimePeriodTab from "./index";
import theme from "../../../theme/theme";
import { timePeriods } from "../../../utils/constants";

describe("Timeperiod Component", () => {
  it("should match snapshot", () => {
    const wrapper = render(<TimePeriodTab selectedTimePeriod="1H" timePeriods={timePeriods} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should correctly show selected tab", () => {
    render(<TimePeriodTab selectedTimePeriod="1H"  timePeriods={timePeriods} />);
    const activeTab = screen.getByTestId("1H");
    expect(activeTab).toBeInTheDocument;
    expect(activeTab).toHaveTextContent("1H");
  });
  it("should have primary3 color", () => {
    render(<TimePeriodTab selectedTimePeriod="1H"  timePeriods={timePeriods} />);
    const activeTab = screen.getByTestId("1H");
    expect(activeTab).toHaveStyle(`color:${theme.palette.primary["500"]}`);
  });
});
