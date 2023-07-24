import React, { useCallback, useEffect, useState } from "react";
import AboutCrypto from "../../components/molecules/AboutAndLinks";
import CardWithStats from "../../components/molecules/CardWithStats";
import DropDown from "../../components/molecules/DropDown/DropDown";
import Footer from "../../components/molecules/Footer";
import SearchFilter from "../../components/molecules/SearchwithFilter";
import TotalBalance from "../../components/molecules/TotalBalance";
import CurrencyOverview from "../../components/organisms/Overview";
import Header from "../../components/organisms/Header";
import SideNavBar from "../../components/organisms/SideNavBar/SideNavBar";
import TabComponent from "../../components/organisms/Tab/index";
import TransactionList from "../../components/organisms/TransactionList";
import BasicTemplate from "../../components/templates/BasicTemplate";
import DetailTemplate from "../../components/templates/Detail/index";
import { graphDataService } from "../../services/services";
import { profilePicName, trade } from "../../utils/constants";
import Avatar from "../../assets/icons/profile.png";
import { getCurrencyById } from "../../services/apiServices";
import {
  getWalletTransactions,
  getWallets,
  getCurrencyPrices,
} from "../../services/apiServices";
import { useParams } from "react-router";
import { CurrencyPrice } from "../../types/responseTypes";
import localeUtils from "../../utils/locale-utils";

const DetailPage: React.FC = () => {
  const dropdownList = [
    {
      key: "1M",
      value: "1M",
    },
  ];
  const { id } = useParams<{ id: string }>();
  const [totalBalance, setTotalBalance] = useState<any>({});
  const [transactionList, setTransactionList] = useState<any>([]);
  const [time, setTime] = useState("1M");
  const [coinData, setCoinData] = useState<any>({});
  const [graphData, setGraphData] = useState<any>({});
  const [trackTime, setTrackTime] = useState<number>(4);
  const [prices, setPrices] = useState<Array<number>>([]);
  const [labels, setLables] = useState<Array<string>>([]);
  const [currencyWalletId, setCurrencyWalletId] = useState<number>(1);
  const [currencyAmount, setCurrencyAmount] = useState<number>(0);
  const getPrices = useCallback(async () => {
    const pricesData: any = await getCurrencyPrices(parseInt(id), trackTime);
    pricesData
      .slice(0, 5)
      .forEach((p: { dateTime: string | number | Date; price: number }) => {
        const formattedDate = localeUtils.formatDateMonth(new Date(p.dateTime));
        console.log(formattedDate);
        setPrices((price) => [...price, p.price]);
        setLables((label) => [...label, `${formattedDate}`]);
      });
  }, [setPrices, setLables]);
  const coinDataFunction = async () => {
    try {
      const coin = await getCurrencyById(parseInt(id));

      setCoinData(coin);
    } catch (error) {
      console.log(error);
    }
  };

  const graphDataFunction = async () => {
    try {
      const graphDataTest = await graphDataService(trackTime);

      const data = graphDataTest;

      setGraphData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    graphDataFunction();
  }, [trackTime]);
  useEffect(() => {
    getPrices();
    coinDataFunction();
    totalBalanceFunction();
    transactionsFunction();
  }, []);
  const totalBalanceFunction = async () => {
    try {
      const totalBal = await getWallets();

      const data: any = totalBal;
      data.forEach(
        (wallet: { currencyId: number; id: number; amount: number }) => {
          if (wallet.currencyId === parseInt(id)) {
            setCurrencyWalletId(wallet.id);
            setCurrencyAmount(wallet.amount);
          }
        },
      );
      setTotalBalance(currencyAmount);
      transactionsFunction();
    } catch (error) {
      console.log(error);
    }
  };
  const transactionsFunction = async () => {
    try {
      const transactions: any = await getWalletTransactions(currencyWalletId);

      setTransactionList(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };

  function changeGraph(time: string) {
    switch (time) {
      case "1M":
        setTrackTime(4);
        break;
      case "1Y":
        setTrackTime(5);
        break;
      case "ALL":
        setTrackTime(6);
        break;
      case "1H":
        setTrackTime(1);
        break;
      case "24H":
        setTrackTime(2);
        break;
      case "1W":
        setTrackTime(3);
        break;
      default:
        setTrackTime(4);
    }
  }
  return (
    <BasicTemplate
      data-testid="detail"
      bgColor={"#FAFCFF"}
      sideNav={<SideNavBar />}
      header={
        <Header
          title={trade}
          avatarPicUrl={Avatar}
          avatarPicAlt={profilePicName}
        />
      }
      footer={<Footer></Footer>}
      body={
        <DetailTemplate
          CardWithStats={
            <CardWithStats
              coin={coinData.name}
              coinIcon={coinData.logoUrl}
              coinShort={coinData.code}
              marketCap={coinData.marketCap}
              vol={coinData.vol24h}
              circulatingSupply={coinData.circulatingSupply}
            />
          }
          TabComponent={
            <TabComponent
              CurrencyOverview={
                <CurrencyOverview
                  currentValue={coinData.price}
                  changeRate={1.02}
                  timePeriod={time}
                  chartXAxisLabels={labels}
                  chartData={{
                    currencyColor: coinData.color,
                    currencyName: coinData.name,
                    data: prices,
                  }}
                  onChangeTimePeriod={(tp) => {
                    changeGraph(tp);
                    setTime(tp);
                    console.log(`Clicked TimePeriodTab ${tp}`);
                  }}
                />
              }
              DropDown={<DropDown default="1M" dropDownList={dropdownList} />}
              SearchComponent={
                <SearchFilter placeholder={"Search all assets"} />
              }
              TransactionList={<TransactionList data={transactionList} />}
              TotalBalance={
                <TotalBalance
                  totalBalanceValueInBTC={totalBalance}
                  code={coinData.code}
                  totalBalanceValueInDollar={totalBalance * coinData.price}
                />
              }
              AboutCrypto={
                <AboutCrypto
                  currency={coinData.coin}
                  content={coinData.about}
                ></AboutCrypto>
              }
            />
          }
        />
      }
    />
  );
};

export default DetailPage;
