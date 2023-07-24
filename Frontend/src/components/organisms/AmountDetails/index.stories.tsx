import React from "react";
import AmountDetails from ".";
export default {
  title: "organisms/AmountDetails",
  component: AmountDetails,
};
import { Currency, Wallet } from "../../../types/responseTypes";
export const selectedCrypto = {
  id: 1,
  currencyType: "CRYPTO",
  name: "Bitcoin",
  code: "BTC",
  about: "ABout",
  logoUrl: "img",
  color: "#FFFFFF",
  price: 1002434,
  marketCap: 673434,
  marketCapShort: "3748",
  vol24h: "74733",
  circulatingSupply: "74837442",
  watch: true,
  changeRate: 2.3,
};
const balance = {
  id: 1,
  userId: 1,
  currencyId: 1,
  currencyType: "CRYPTO",
  amount: 378438,
};

export const amountDetails = () => (
  <AmountDetails
    amountEventHandler={() => console.log("amount entered")}
    selectedCrypto={selectedCrypto}
    amountEntered={34000.0}
    convertedCoinHandler={() => console.log("converted")}
    convertedCoin={0.023451}
    buttonTitle="Buy max"
    totalBal={2844}
    cryptoBal={balance}
    error=""
    setErrorHandler={() => console.log("error message")}
  />
);
