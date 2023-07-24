import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TabComponent from "./index";
import TotalBalance from "../../molecules/TotalBalance";
import AboutCrypto from "../../molecules/AboutAndLinks";
import TransactionList from "../TransactionList";
import SearchComponent from "../../molecules/SearchBar";
import DropDown from "../../molecules/DropDown/DropDown";
import CurrencyOverview from "../Overview";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
const dropdownList = [
  {
    key: "1M",
    value: "1M",
  },
];
const transactions = [
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
  {
    day: "23",
    statusIcon: CheckLine,
    coin: "Bitcoin",
    symbol: "BTC",
    chipLabel: "Sold",
    coinAmount: "-0.0234510",
    price: "+$34,000.00",
    iconBgColor: `${theme.palette.success["100"]}`,
    month: "June",
    buyer: "Badgley",
  },
];

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TabComponent
      CurrencyOverview={
        <CurrencyOverview
          currentValue={3285553.73}
          changeRate={8.2}
          timePeriod={"1M"}
          chartXAxisLabels={["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"]}
          chartData={{
            currencyColor: "#F7931A",
            currencyName: "Bitcoin",
            data: [100, 300, 250, 320, 400],
          }}
          onChangeTimePeriod={(tp) =>
            console.log(`Clicked TimePeriodTab ${tp}`)
          }
        />
      }
      DropDown={<DropDown default="1M" dropDownList={dropdownList} />}
      SearchComponent={
        <SearchComponent label="Search all assets" variant="outlined" />
      }
      TransactionList={<TransactionList data={transactions} />}
      TotalBalance={
        <TotalBalance
          totalBalanceValueInBTC="0.0023034"
          totalBalanceValueInDollar="13,456,788,999"
        />
      }
      AboutCrypto={
        <AboutCrypto
          currency="Ethereum"
          content="Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet."
        ></AboutCrypto>
      }
    />,
    div,
  );
});
