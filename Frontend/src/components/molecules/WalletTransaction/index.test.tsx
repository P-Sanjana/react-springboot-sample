import React from "react";
import { render, screen } from "@testing-library/react";
import WalletCard from "./index";
import theme from "../../../theme/theme";
import ConfirmIcon from "../../../assets/icons/check-line.svg";

describe("WalletCard component", () => {
  it("should have days between 1-31", () => {
    render(
      <WalletCard
        month="Feb"
        day="28"
        statusIcon={ConfirmIcon}
        coin="Bitcoin"
        buyer="Badgley"
        coinAmount="+0.0010"
        price="+$900"
        symbol="BTC"
        iconBgColor={theme.palette.success["100"]}
        chipLabel="Purchased"
      />,
    );
    const day = screen.getByTestId("day").textContent;
    if (day) {
      expect(parseInt(day)).toBeLessThanOrEqual(31);
      expect(parseInt(day)).toBeGreaterThan(0);
    }
  });
  it("should have coin defined", () => {
    render(
      <WalletCard
        month="Feb"
        day="28"
        statusIcon={ConfirmIcon}
        coin="Bitcoin"
        buyer="Badgley"
        coinAmount="+0.0010"
        price="+$900"
        symbol="BTC"
        iconBgColor={theme.palette.success["100"]}
        chipLabel="Purchased"
      />,
    );
    const coin = screen.queryByTestId("coin");
    expect(coin).toBeDefined();
  });
});
