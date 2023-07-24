import { render } from "@testing-library/react";
import React from "react";
import DashboardTemplate from ".";
import USDCoin from "../../../assets/coinImage/USD-icon.svg";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
import { chips, portfolioCards } from "../../../utils/mockData";
import CurrencyChipStrip from "../../molecules/ChipStrip";
import MyPortfolio from "../../organisms/UserInvestments";
import PortfolioValue from "../../organisms/UserInvestmentValue";
import MyWallet from "../../organisms/MyWallet";
import RecentTransactions from "../../organisms/RecentTransactions";
import WatchList from "../../organisms/WatchList";
import { MemoryRouter } from "react-router-dom";

describe("Portfolio Value Component", () => {
  const transactions = [
    {
      id: 1,
      userId: 1,
      walletId: 1,
      currencyId: 1,
      currencyName: "Bitcoin",
      currencyCode: "BTC",
      type: "CRYPTO",
      status: "PENDING",
      currencyAmount: 34784,
      amount: 48348,
      participantName: "JOHN",
      datetime: "June 23",
    },
  ];
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
  it("should match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <DashboardTemplate
          currencychip={
            <CurrencyChipStrip
              data={chips}
              onClick={(index: any) => {
                console.log(`Selected ${index}`);
              }}
            />
          }
          recenttransactions={<RecentTransactions data={transactions} />}
          portfoliovalue={<PortfolioValue price={3487} />}
          myportfolio={
            <MyPortfolio
              portfolioCards={portfolioCards}
              totalBalance={14027.2}
            />
          }
          watchlist={<WatchList graphDataProp={data} />}
          mywallet={
            <MyWallet
              icon={USDCoin}
              currencyType="USD Coin"
              currencyCode="US Dollar"
              currencyValue={34000.0}
            />
          }
        />
      </MemoryRouter>,
    );
    expect(wrapper.getByTestId("dashboard")).toBeInTheDocument();
  });
});
