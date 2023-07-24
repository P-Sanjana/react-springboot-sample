import React from "react";
import { render, waitFor } from "@testing-library/react";
import DetailPage from "./index";
import { MemoryRouter } from "react-router";
import * as services from "../../services/services";

const coinData = {
  id: 0,
  coinIcon:
    "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
  coin: "Bitcoin",
  amount: "345,678,945",
  percentage: "1.06",
  marketCap: "64.2T",
  vol: "2.9T",
  color: "#F7931A",
  circulatingSupply: "18.8M ",
  coinShort: "BTC",
  gains: "-10.5",
  currentValue: "3,285,553.73",
  about:
    "The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin.",
};
const graphData = [
  {
    id: 0,
    timePeriod: "1M",
    axisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
    data: [100, 300, 250, 320, 400],
  },
  {
    id: 1,
    timePeriod: "1Y",
    axisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
    data: [100, 300, 250, 320, 400],
  },
];
const totalBalance = [
  {
    id: 1,
    name: "John",
    balanceInBTC: "0.0234510",
    balanceInDollar: "85,553.73",
    totalBalanceInDollar: "102,330.62",
    totalInvestment: "11,900,204",
    totalGains: "-1.2",
  },
];
const transactiondata = [
  {
    day: "23",
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    month: "June",
    buyer: "Badgley",
    status: "Done",
  },
];

describe("Detail Page", () => {
  test("should have match snapshot", async () => {
    const spyGetCoinData = jest.spyOn(services, "coinDataService");
    spyGetCoinData.mockResolvedValue(coinData);

    const spyGetGraphData = jest.spyOn(services, "graphDataService");
    spyGetGraphData.mockResolvedValue(graphData);

    const spyGetTotalBalance = jest.spyOn(services, "totalBalanceService");
    spyGetTotalBalance.mockResolvedValue(totalBalance);

    const spyGetTransactiondata = jest.spyOn(services, "transactionsService");
    spyGetTransactiondata.mockResolvedValue(transactiondata);

    const wrapper = render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(wrapper.getByTestId("coin")).toBeInTheDocument();
    });
  }, 30000);
});
