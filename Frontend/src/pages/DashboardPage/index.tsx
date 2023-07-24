import React, { useCallback, useEffect, useState } from "react";
import BasicTemplate from "../../components/templates/BasicTemplate";
import DashboardTemplate from "../../components/templates/Dashboard";
import Header from "../../components/organisms/Header";
import SideNavBar from "../../components/organisms/SideNavBar/SideNavBar";
import Footer from "../../components/molecules/Footer";
import { chips } from "../../utils/mockData";
import CurrencyChipStrip from "../../components/molecules/ChipStrip";
import RecentTransactions from "../../components/organisms/RecentTransactions";
import PortfolioValue from "../../components/organisms/UserInvestmentValue";
import MyPortfolio from "../../components/organisms/UserInvestments";
import WatchList from "../../components/organisms/WatchList";
import MyWallet from "../../components/organisms/MyWallet";
import USDCoin from "../../assets/coinImage/USD-icon.svg";
import { profilePicName } from "../../utils/constants";
import Avatar from "../../assets/icons/profile.png";

import {
  getWallets,
  getTransactions,
  getPortfolio,
  getCurrencyById,
  getPortfolioChanges,
  getCurrencies,
  getWatchlist,
  getCurrencyPrices,
} from "../../services/apiServices";
import {
  Portfolio,
  Currency,
  PortfolioChanges,
  Watchlist,
  CurrencyPrice,
} from "../../types/responseTypes";
import localeUtils from "../../utils/locale-utils";

type dataType = {
  currencyColor: string;
  currencyName: string;
  data: Array<number>;
};

type GraphDataType = {
  xAxisLabels: Array<string>;
  dataArr: Array<dataType>;
};
export type watchGraph = {
  datetime: string;
  value: number;
};

export type watchlistChart = {
  id?: number;
  icon: string;
  currencyType: string;
  currencyValue: number;
  gains: number;
  graphData: Array<watchGraph>;
};

type priceGainType = {
  price: number;
  gain: number;
};

const DashboardPage: React.FC = () => {
  const [watchlistData, setWatchlistData] = useState<Array<watchlistChart>>();
  const [totalBalance, setTotalBalance] = useState();
  const [trackTime, setTrackTime] = useState<number>(43200);
  const [transactionsData, setTransactionsData] = useState<any>();
  const [selectedCurrencies, setSelectedCurrencies] = useState<any>([]);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const selected: any[] = [];
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);
  const [graph, setGraph] = useState<PortfolioChanges[]>();
  const [multiChart, setMultiChart] = useState<GraphDataType>();
  const [allCurrencies, setAllCurrencies] = useState<Array<Currency>>([]);
  const [bitcoinId, setBitcoinId] = useState<number>(1);
  const [price, setPrice] = useState<number>();
  const [gain, setGain] = useState<number>();
  function changeGraph(time: string) {
    console.log(time);
    switch (time) {
      case "1M":
        setTrackTime(43200);
        break;
      case "1Y":
        setTrackTime(15768000);
        break;
      case "ALL":
        setTrackTime(15768000);
        break;
      case "1H":
        setTrackTime(60);
        break;
      case "24H":
        setTrackTime(1440);
        break;
      case "1W":
        setTrackTime(10080);
        break;
      default:
        setTrackTime(43200);
    }
  }
  const getCurrenciesData = useCallback(async () => {
    const curr: any = await getCurrencies();
    setAllCurrencies(curr);
  }, [setAllCurrencies]);

  useEffect(() => {
    allCurrencies.forEach((curr) => {
      if (curr.name === "Bitcoin") {
        setBitcoinId(curr.id);
        setPrice(curr.price);
      }
    });
  }, [allCurrencies]);

  const getPortfolioData = useCallback(async () => {
    try {
      const portfolio: any = await getPortfolio();
      console.log(portfolio);
      setPortfolioData(portfolio);
    } catch (error) {
      console.log(error);
    }
  }, [setPortfolioData]);

  const calcGain = (initial: number, current: number) => {
    const change = ((current - initial) / initial) * 100;
    return Math.round((change + Number.EPSILON) * 100) / 100;
  };

  const currenciesData = useCallback(async () => {
    try {
      const data = await getWatchlist();

      const watchArr: Array<watchlistChart> = [];
      for (const curr of data) {
        const prices: Array<CurrencyPrice> = await getCurrencyPrices(
          curr.id,
          2,
        );
        const dataArr: Array<watchGraph> = [];
        for (const p of prices) {
          console.log(p);
          dataArr.push({
            datetime: new Date(p.dateTime).toString(),
            value: p.price,
          });
        }
        const gain: number = calcGain(
          prices[0].price,
          prices[prices.length - 1].price,
        );
        setGain(gain);
        const watch = {
          id: curr.id,
          icon: curr.logoImageUrl,
          currencyType: curr.name,
          currencyValue: prices[prices.length - 1].price,
          gains: gain,
          graphData: dataArr,
        };
        watchArr.push(watch);
      }
      setWatchlistData(watchArr);
      console.log(watchlistData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    portfolioData?.forEach((a: { investedAmount: number }) =>
      setTotalPortfolioValue((total) => a.investedAmount + total),
    );
    portfolioData?.forEach((p: { currencyId: number }) => {
      getCurrency(p.currencyId);
    });
  }, [portfolioData]);

  const getCurrency = useCallback(
    async (id: number) => {
      try {
        const currency: Currency = await getCurrencyById(id);
        setCurrencies((arr) => [...arr, currency]);
      } catch (err) {
        console.log(err);
      }
    },
    [setCurrencies],
  );

  const totalBalanceFunction = useCallback(async () => {
    try {
      const entry = await getWallets();

      const data: any = entry;

      setTotalBalance(
        data.filter((wallet: { currencyType: string }) => {
          return wallet.currencyType === "CASH";
        })[0].amount,
      );
    } catch (error) {
      console.log(error);
    }
  }, [setTotalBalance]);

  const getGraph = useCallback(async () => {
    try {
      const data: any = await getPortfolioChanges(bitcoinId, trackTime);
      setGraph(data);
    } catch (err) {
      console.log(err);
    }
  }, [setGraph, bitcoinId]);

  const transactionData = useCallback(async () => {
    try {
      const entry: any = await getTransactions(5, 0);

      const data: any = entry.data;
      setTransactionsData(data);
    } catch (error) {
      console.log(error);
    }
  }, [setTransactionsData]);

  useEffect(() => {
    const labels: Array<string> = [];
    const dataPoints: Array<dataType> = [];
    dataPoints.push({
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [],
    });
    dataPoints.push({
      currencyColor: "#0052FF",
      currencyName: "Total Investment",
      data: [],
    });
    graph?.slice(0, 5).forEach((d) => {
      const formattedDate = localeUtils
        .formatDatetime24h(new Date(d.datetime))
        .split(" ");

      labels.push(
        `${formattedDate[1].substr(0, formattedDate[1].length - 1)} ${
          formattedDate[0]
        }`,
      );
      dataPoints[0].data.push(d.changedAmount);
      dataPoints[1].data.push(d.investedAmount);
    });
    const multi: GraphDataType = {
      xAxisLabels: labels,
      dataArr: dataPoints,
    };
    setMultiChart(multi);
  }, [graph]);

  useEffect(() => {
    getCurrenciesData();
    currenciesData();
    getPortfolioData();
    transactionData();
    totalBalanceFunction();
  }, []);

  useEffect(() => {
    getGraph();
  }, [trackTime, bitcoinId]);

  return (
    <BasicTemplate
      sideNav={<SideNavBar />}
      header={
        <Header
          title="Dashboard"
          avatarPicUrl={Avatar}
          avatarPicAlt={profilePicName}
        />
      }
      footer={<Footer />}
      body={
        <DashboardTemplate
          currencychip={
            <CurrencyChipStrip
              data={chips}
              onClick={(index: any) => {
                selected.push(index);
                setSelectedCurrencies(selected);
              }}
            />
          }
          recenttransactions={<RecentTransactions data={transactionsData} />}
          portfoliovalue={
            <PortfolioValue
              onChangeTimePeriod={(tp) => {
                changeGraph(tp);
              }}
              selectedIndexes={selectedCurrencies}
              data={multiChart}
              totalInvestment={totalPortfolioValue}
              totalGains={gain}
              price={price}
            />
          }
          myportfolio={
            <MyPortfolio
              portfolioCards={portfolioData}
              totalBalance={totalPortfolioValue}
              currencies={currencies}
            />
          }
          watchlist={<WatchList graphDataProp={watchlistData} />}
          mywallet={
            <MyWallet
              icon={USDCoin}
              currencyType="USD Coin"
              currencyCode="US Dollar"
              currencyValue={totalBalance}
            />
          }
        />
      }
    />
  );
};

export default DashboardPage;
