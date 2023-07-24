import React from "react";
import { render, screen } from "@testing-library/react";
import BuySell from "./index";
import ChooseCrypto from "../../organisms/SelectionCard/index";
import OrderSummary from "../../organisms/OrderSummary/index";
import PaymentMethod from "../../organisms/PaymentMethod/index";
import AmountDetails from "../../organisms/AmountDetails/index";
import DeliveryFee from "../../organisms/DeliverFee/index";
import BitcoinWallet from "../../../assets/icons/bit-coin-line.svg";
import Wallet from "../../../assets/icons/wallet-2-line.svg";
import theme from "../../../theme/theme";
import { cryptos, balance } from "../../../utils/constants";

describe("Buy Sell template", () => {
  const selectedCrypto = {
    currency: "Bitcoin",
    price: "345678",
    symbol: "BTC",
  };
  const order = {
    transactionFee: "1000.00",
    color: theme.palette.warning["500"],
    payingThroughIcon: BitcoinWallet,
    depositToIcon: Wallet,
    transactionTypeButton: "Sell now",
    transactionTypeHeader: "selling",
  };
  const balanceusd = {
    usdOrTotal: "t",
    cardTitle: "Total Balance",
  };
  const deposit = {
    usdOrTotal: "u",
    cardTitle: "Deposit to",
  };
  it("should have choose crypto compoent", () => {
    render(
      <BuySell
        chooseCryptoComponent={
          <ChooseCrypto
            data={cryptos}
            onSelect={(crypto) => console.log(`selected crypto ${crypto}`)}
            selectedCrypto={selectedCrypto}
            title="Sell Crypto"
          />
        }
        orderSummaryComponent={
          <OrderSummary
            {...order}
            cryptoTransactionUnits={0.02367}
            selectedCrypto={selectedCrypto}
            transactionAmount={278900}
            error=""
            totalBalance={balance}
            btnClicked={() => console.log("button clicked")}
          />
        }
        paymentComponent={<PaymentMethod {...balanceusd} />}
        amountDetailsComponent={
          <AmountDetails
            amountEventHandler={() => console.log("amount handler")}
            amountEntered={250000}
            selectedCrypto={selectedCrypto}
            buttonTitle="Buy max"
            convertedCoin={0.04578}
            convertedCoinHandler={() => console.log("converted coin")}
            totalBal={balance}
            error={""}
            setErrorHandler={() => {
              console.log("error message handler");
            }}
          />
        }
        deliveryFeeComponent={<DeliveryFee />}
        depositComponent={<PaymentMethod {...deposit} />}
        buy={false}
      />,
    );
    const chooseCrypto = screen.getByTestId("chooseCrypto");
    expect(chooseCrypto).toBeDefined();
  });

  it("should have amount details component", () => {
    render(
      <BuySell
        chooseCryptoComponent={
          <ChooseCrypto
            data={cryptos}
            onSelect={(crypto) => console.log(`selected crypto ${crypto}`)}
            selectedCrypto={selectedCrypto}
            title="Sell Crypto"
          />
        }
        orderSummaryComponent={
          <OrderSummary
            {...order}
            cryptoTransactionUnits={0.02367}
            selectedCrypto={selectedCrypto}
            transactionAmount={278900}
            error=""
            totalBalance={balance}
            btnClicked={() => console.log("button clicked")}
          />
        }
        paymentComponent={<PaymentMethod {...balanceusd} />}
        amountDetailsComponent={
          <AmountDetails
            amountEventHandler={() => console.log("amount handler")}
            amountEntered={250000}
            selectedCrypto={selectedCrypto}
            buttonTitle="Buy max"
            convertedCoin={0.04578}
            convertedCoinHandler={() => console.log("converted coin")}
            totalBal={balance}
            error={""}
            setErrorHandler={() => {
              console.log("error message handler");
            }}
          />
        }
        deliveryFeeComponent={<DeliveryFee />}
        depositComponent={<PaymentMethod {...deposit} />}
        buy={false}
      />,
    );
    const amountDetails = screen.getByTestId("amountDetails");
    expect(amountDetails).toBeDefined();
  });
});
