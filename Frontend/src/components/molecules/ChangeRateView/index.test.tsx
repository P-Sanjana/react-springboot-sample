import { ThemeProvider } from "@material-ui/core";
import { render } from "@testing-library/react";
import React from "react";
import ChangeRateView from ".";
import ArrowLeftDownIcon from "../../../assets/icons/arrow-right-down-line.svg";
import ArrowRightUpIcon from "../../../assets/icons/arrow-right-up-line.svg";
import theme from "../../../theme/theme";

describe("ChageRateView molecule component", () => {
  it("should show positive", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <ChangeRateView changeRate={25} />
      </ThemeProvider>
    );
    const icon = wrapper.getByTestId("crv-icon");
    expect(icon).toHaveAttribute("src", ArrowRightUpIcon);
    const text = wrapper.getByTestId("crv-text");
    expect(text).toHaveStyle({
      color: theme.palette.success.main,
    });
  });

  it("should show negative", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <ChangeRateView changeRate={-25} />
      </ThemeProvider>
    );
    const icon = wrapper.getByTestId("crv-icon");
    expect(icon).toHaveAttribute("src", ArrowLeftDownIcon);
    const text = wrapper.getByTestId("crv-text");
    expect(text).toHaveStyle({
      color: theme.palette.error.main,
    });
  });

  it("should show zero", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <ChangeRateView changeRate={0} />
      </ThemeProvider>
    );
    const icon = wrapper.getByTestId("crv-icon");
    expect(icon).toHaveAttribute("src", ArrowRightUpIcon);
    const text = wrapper.getByTestId("crv-text");
    expect(text).toHaveStyle({
      color: theme.palette.success.main,
    });
  });
});
