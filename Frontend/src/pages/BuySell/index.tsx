import React, { useCallback, useEffect, useState } from "react";
import BuySell from "../../components/templates/BuySell/index";
import ChooseCrypto from "../../components/organisms/SelectionCard/index";
import OrderSummary from "../../components/organisms/OrderSummary/index";
import PaymentMethod from "../../components/organisms/PaymentMethod/index";
import AmountDetails from "../../components/organisms/AmountDetails/index";
import DeliveryFee from "../../components/organisms/DeliverFee/index";
import BitcoinWallet from "../../assets/icons/bit-coin-line.svg";
import WalletIcon from "../../assets/icons/wallet-2-line.svg";
import theme from "../../theme/theme";
import Header from "../../components/organisms/Header/index";
import Footer from "../../components/molecules/Footer/index";
import SideNavBar from "../../components/organisms/SideNavBar/SideNavBar";
import BasicTemplate from "../../components/templates/BasicTemplate/index";
import { profilePicName } from "../../utils/constants";
import CheckoutComponent from "../../components/organisms/Checkout";
import Avatar from "../../assets/icons/profile.png";
import {
  getCurrencies,
  getWallets,
  getWalletById,
  postBuy,
  postSell,
} from "../../services/apiServices";
import { Currency, Wallet } from "../../types/responseTypes";

export type BuySellProps = {
  buy: boolean;
  key?: string;
};

const BuySellPage: React.FC<BuySellProps> = ({ buy, key }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<Currency>();
  const [amountEntered, setAmountEntered] = useState<number>(0);
  const [convertedCoin, setConvertedCoin] = useState<number>();
  const [checkoutVal, setCheckoutVal] = useState<number | undefined>(undefined);
  const [prevKey, setPrevKey] = useState<string | undefined>(undefined);
  const [totalBal, setTotalBal] = useState<Array<Wallet> | any>([]);
  const [error, setError] = useState<string>();
  const [currencies, setCurrencies] = useState<Array<Currency> | any>([]);
  const [selectedCryptoBal, setSelectedCryptoBal] = useState<Wallet>();
  const [currencyCashId, setCurrencyCashId] = useState<number>(0);
  const [cashId, setCashId] = useState<number>(0);
  const [walletAmount, setWalletAmount] = useState<number>(1);
  const getTotalBalFn = useCallback(async () => {
    try {
      const getBalance = await getWallets();
      setTotalBal(getBalance);
      setWalletAmount(
        getBalance.filter((wallet: { currencyType: string }) => {
          return wallet.currencyType === "CASH";
        })[0].amount,
      );
      getBalance.forEach((wallet) => {
        if (wallet.currencyType === "CASH") {
          setCashId(wallet.id);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [setTotalBal]);
  const getCurrenciesFn = useCallback(async () => {
    try {
      const currenciesData = await getCurrencies();

      setCurrencies(currenciesData);
      currenciesData.forEach((currency: Currency) => {
        if (currency.currencyType === "CASH") {
          setCurrencyCashId(currency.id);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [setCurrencies]);

  const getSelectedBal = useCallback(
    async (id: number) => {
      try {
        const getBal: any = await getWalletById(id);
        setSelectedCryptoBal(getBal);
      } catch (err) {
        console.log(err);
      }
    },
    [setSelectedCryptoBal],
  );

  useEffect(() => {
    if (checkoutVal && prevKey != key) {
      setCheckoutVal(undefined);
    }
    getTotalBalFn();
    getCurrenciesFn();
    setPrevKey(key);
  }, []);

  useEffect(() => {
    totalBal.forEach((bal: Wallet) => {
      if (bal.currencyId === selectedCrypto?.id) {
        getSelectedBal(bal.id);
      }
    });
  }, [selectedCrypto]);

  const postBuyTransaction = async () => {
    console.log(cashId);
    const buyTransaction = {
      currencyId: selectedCrypto?.id,
      currencyAmount: convertedCoin,
      deliveryType: "INSTANT",
      paymentMethod: {
        paymentType: "WALLET",
        cardNo: "visa",
        walletId: cashId,
      },
    };
    postBuy(buyTransaction);
    setCheckoutVal(convertedCoin);
  };

  const postSellTransaction = async () => {
    const sellTransaction = {
      walletId: selectedCryptoBal?.id,
      currencyId: selectedCrypto?.id,
      currencyAmount: convertedCoin,
      deliveryType: "INSTANT",
      depositToCurrencyId: currencyCashId,
    };
    postSell(sellTransaction);
    setCheckoutVal(convertedCoin);
  };

  const cryptoBalance = {
    usdOrTotal: "t",
    cardTitle: "Total Balance",
  };
  const deposit = {
    usdOrTotal: "u",
    cardTitle: "Deposit to",
  };
  const usdBalance = {
    usdOrTotal: "u",
    cardTitle: "Payment Method",
  };
  const order = {
    transactionFee: "1000.00",
    color: buy ? theme.palette.primary["500"] : theme.palette.warning["500"],
    payingThroughIcon: BitcoinWallet,
    depositToIcon: WalletIcon,
    transactionTypeButton: `${buy ? "Buy now" : "Sell now"}`,
    transactionTypeHeader: `${buy ? "buying" : "selling"}`,
  };
  const chooseCryptoTitle = `${buy ? "Buy Crypto" : "Sell Crypto"}`;
  const amountDetailsTitle = `${buy ? "Buy max" : "Sell max"}`;
  const paymentTypeComp = buy ? (
    <PaymentMethod {...usdBalance} totalBal={walletAmount} />
  ) : (
    <PaymentMethod
      {...cryptoBalance}
      selectedCrypto={selectedCrypto}
      selectedCryptoBal={selectedCryptoBal}
    />
  );
  const processType = buy ? "buy" : "sell";
  return (
    <BasicTemplate
      header={
        <Header
          title="Checkout"
          avatarPicUrl={Avatar}
          avatarPicAlt={profilePicName}
        />
      }
      sideNav={<SideNavBar />}
      footer={<Footer />}
      body={
        !checkoutVal ? (
          <BuySell
            chooseCryptoComponent={
              <ChooseCrypto
                data-testid="chooseCrypto"
                data={currencies}
                onSelect={(crypto) => setSelectedCrypto(crypto)}
                selectedCrypto={selectedCrypto}
                title={chooseCryptoTitle}
              />
            }
            orderSummaryComponent={
              <OrderSummary
                data-testid="orderSummary"
                {...order}
                cryptoTransactionUnits={convertedCoin}
                selectedCrypto={selectedCrypto}
                transactionAmount={amountEntered}
                error={error}
                btnClicked={buy ? postBuyTransaction : postSellTransaction}
              />
            }
            paymentComponent={paymentTypeComp}
            amountDetailsComponent={
              <AmountDetails
                amountEventHandler={setAmountEntered}
                amountEntered={amountEntered}
                selectedCrypto={selectedCrypto}
                buttonTitle={amountDetailsTitle}
                convertedCoin={convertedCoin}
                convertedCoinHandler={setConvertedCoin}
                totalBal={walletAmount}
                error={error}
                setErrorHandler={setError}
                cryptoBal={selectedCryptoBal}
              />
            }
            deliveryFeeComponent={<DeliveryFee />}
            depositComponent={<PaymentMethod {...deposit} />}
            buy={buy}
          />
        ) : (
          <CheckoutComponent
            total={checkoutVal}
            process={processType}
            currency={selectedCrypto?.code}
          />
        )
      }
    />
  );
};

export default BuySellPage;
