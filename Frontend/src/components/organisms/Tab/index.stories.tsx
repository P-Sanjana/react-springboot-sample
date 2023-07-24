import React from "react";
import { Story, Meta } from "@storybook/react";
import TabComponent, { TabProps } from "./index";
import CurrencyOverview from "../Overview/index";
import DropDown from "../../molecules/DropDown/DropDown";
import SearchComponent from "../../molecules/SearchBar";
import TransactionList from "../TransactionList/index";
import TotalBalance from "../../molecules/TotalBalance";
import AboutCrypto from "../../molecules/AboutAndLinks";
import CheckLine from "../../../assets/icons/check-line.svg";
import theme from "../../../theme/theme";
export default {
  title: "organisms/tab",
  component: TabComponent,
} as Meta;
import { transactions } from "../RecentTransactions/index.stories";

const Template: Story<TabProps> = (args) => <TabComponent {...args} />;
const dropdownList = [
  {
    key: "1M",
    value: "1M",
  },
];

Template.args = {
  CurrencyOverview: (
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
      onChangeTimePeriod={(tp) => console.log(`Clicked TimePeriodTab ${tp}`)}
    />
  ),
  DropDown: <DropDown default="1M" dropDownList={dropdownList} />,
  SearchComponent: (
    <SearchComponent label="Search all assets" variant="outlined" />
  ),
  TransactionList: <TransactionList data={transactions} />,
  TotalBalance: (
    <TotalBalance
      totalBalanceValueInBTC={0.0023034}
      totalBalanceValueInDollar={13456788999}
    />
  ),
  AboutCrypto: (
    <AboutCrypto
      currency="Ethereum"
      content="Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet."
    ></AboutCrypto>
  ),
};
