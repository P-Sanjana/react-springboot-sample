import React from "react";
import { render } from "@testing-library/react";
import DetailTemplate from "./index";
import { MemoryRouter } from "react-router";
import CardWithStats from "../../molecules/CardWithStats";
import Bitcoin from "../../../../src/assets/coinImage/bitcoin.png";
import TabComponent from "../../organisms/Tab";
import CurrencyOverview from "../../organisms/Overview";
import DropDown from "../../molecules/DropDown/DropDown";
import AboutCrypto from "../../molecules/AboutAndLinks";
import TotalBalance from "../../molecules/TotalBalance";
import TransactionList from "../../organisms/TransactionList";
import SearchComponent from "../../molecules/SearchBar";
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
];

describe("Detail Template", () => {
  it("should have match snapshot", () => {
    const wrapper = render(
      <MemoryRouter>
        <DetailTemplate
          CardWithStats={
            <CardWithStats
              coin="Bitcoin"
              coinShort="BTC"
              marketCap="64.2T"
              vol="2.9T"
              circulatingSupply="18.8M"
              changeRate="+8.01%"
              coinIcon={Bitcoin}
            />
          }
          TabComponent={
            <TabComponent
              CurrencyOverview={
                <CurrencyOverview
                  currentValue={3285553.73}
                  changeRate={8.2}
                  timePeriod={"1M"}
                  chartXAxisLabels={[
                    "SEP 16",
                    "SEP 24",
                    "SEP 30",
                    "OCT 07",
                    "OCT 14",
                  ]}
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
            />
          }
        />
      </MemoryRouter>,
    );

    expect(wrapper).toBeTruthy();
  });
});
