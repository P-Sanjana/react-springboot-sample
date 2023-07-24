import {
  CryptoProps,
  serverCryptoProps,
} from "../components/organisms/SelectionCard/index";
import Bitcoin from "../assets/coinImage//bitcoin.png";
import Ethereum from "../assets/coinImage/ethereum.png";
import Dogecoin from "../assets/coinImage/Dogecoin.png";
import Binance from "../assets/coinImage/binance.png";
import Cardano from "../assets/coinImage/Cardano.png";
import Polkadot from "../assets/coinImage/Polkadot.png";
import Tether from "../assets/coinImage/tether.png";
import XRP from "../assets/coinImage/xrp.jpeg";
import USDCoin from "../assets/coinImage/usdcoin.jpeg";
import { DropDownItem } from "../components/molecules/DropDown/DropDown";
export const test: string[] = ["hello", "bye"];
export const timePeriods: string[] = ["1H", "24H", "1W", "1M", "1Y", "ALL"];
export const aboutCrypto: string[] = [
  "About",
  "Resources",
  "Official Website",
  "White Paper",
];
export const addedToWatchList = "ADDED TO WATCHLIST";
export const checkoutList: string[] = [
  "Purchase is completed, please check your balance in your crypto wallet",
  "Buy Crypto",
  "Go To Wallet",
  "Sell is completed, please check your balance in your Rupee coin",
  "SELL CRYPTO",
  "GO TO USD COIN",
];
export const dashboard = "Dashboard";
export const trade = "Detail";
export const profilePicUrl =
  "https://s3-alpha-sig.figma.com/img/973c/8b4c/05e06771ca57ec378072223b93fc6007?Expires=1635724800&Signature=LoSuQuAoiSGeFs04cT-kZICbfCNVFSd~jnfp6ffpCUDjKiWkq9dvi61je-5x7~toH3IMbNrCQrfctP-mrlVh~H7iAF-UlMNO66--TqlXExfb91MLGLnuK8O5HONWoVL0cT9Zxqx0iBMifwRo8oY~3f45YVs52Kw2FH8LwZxbYDhZCAev85Kqk7yofawgrWgZoYQJTaS~Re4TV09PF56F4wCcbZm81XaIgCbPDF2vZg~ybhPfMAeUf18TseFlsLPU1tbCigTOF3rPjeU5bSQvaBwJrDSGNUkeEdHxpfqfV4CihwWdxdXms67T5IcnBDlMR~AzVGJL~KIiu4lLZ~Fh5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
export const profilePicName = "John Deere";
export const one = "1";
export const dash = "-";
export const cardWithGraph: string[] = ["24 h"];
export const totalBalance = "Total Balance";
export const btc = "BTC";
export const cash = "Cash";
export const usdCoin = "USD Coin";
export const defaul = "Default";
export const from = "From";
export const recentTransactions = "Recent transactions";
export const viewAll = "View All";
export const myPortfolio = ["My portfolio", "Total Balance"];
export const currentValue = "Current Value";
export const myWallets = "My wallets";
export const chooseCrypto = "Choose crypto";
export const watchlist = "Watchlist";
export const discoverAssets = "Discover assets";
export const edit = "EDIT";
export const wallet = "Wallet";
export const OrderSummaryConsts: string[] = [
  "You are ",
  "transaction fee",
  "Total",
  "$",
  "Paying through",
  "Visa credit ...8845",
  "Delivery fees",
  "0.001",
  "Deposit to",
  "Wallet",
  "Payment method",
  "Rupee Coin",
];
export const amountDetails = "Amount details";
export const dollarSign = "$";
export const rupeeSign = "₹";
export const equalToSign = "=";
export const buttonTextBuy = "BUY";
export const buttonTextSell = "SELL";
export const marketcap = "Market cap";
export const vol24H = "Vol.24H";
export const circulatingsupply = "Circulating supply";
export const cashDeposit = "CASH DEPOSIT";
export const withdraw = "WITHDRAWAL";
export const deliveryFee = [
  "Select speed delivery",
  "Instant : 2-5 min",
  "Transaction fees : 0.001 BTC",
  "Instant",
  ": 2-5 minutes",
  "Delivery fees : 0.001 BTC",
  "Faster",
  ": 4 hours",
  "Delivery fees : 0.0001 BTC",
  "Fast",
  ": 120 hours",
  "Delivery fees : 0.00001 BTC",
  "None",
];
export const cryptos: Array<CryptoProps> = [
  {
    currency: "Bitcoin",
    icon: Bitcoin,
  },
  {
    currency: "Ethereum",
    icon: Ethereum,
  },
  {
    currency: "Binance",
    icon: Binance,
  },
  {
    currency: "Tether",
    icon: Tether,
  },
  {
    currency: "Cardano",
    icon: Cardano,
  },
  {
    currency: "XRP",
    icon: XRP,
  },
  {
    currency: "Dogecoin",
    icon: Dogecoin,
  },
  {
    currency: "Polkadot",
    icon: Polkadot,
  },
  {
    currency: "USDCoin",
    icon: USDCoin,
  },
];
export const portfolioValue = [
  "My portfolio value",
  "Total Investment",
  "Bitcoin",
  "$ 11,900,204",
  "$ 34,000",
];
export const dashboardpage = [
  "https://s3-alpha-sig.figma.com/img/973c/8b4c/05e06771ca57ec378072223b93fc6007?Expires=1635724800&Signature=LoSuQuAoiSGeFs04cT-kZICbfCNVFSd~jnfp6ffpCUDjKiWkq9dvi61je-5x7~toH3IMbNrCQrfctP-mrlVh~H7iAF-UlMNO66--TqlXExfb91MLGLnuK8O5HONWoVL0cT9Zxqx0iBMifwRo8oY~3f45YVs52Kw2FH8LwZxbYDhZCAev85Kqk7yofawgrWgZoYQJTaS~Re4TV09PF56F4wCcbZm81XaIgCbPDF2vZg~ybhPfMAeUf18TseFlsLPU1tbCigTOF3rPjeU5bSQvaBwJrDSGNUkeEdHxpfqfV4CihwWdxdXms67T5IcnBDlMR~AzVGJL~KIiu4lLZ~Fh5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
];
export const selectedCrypto: serverCryptoProps = {
  currency: "Bitcoin",
  price: "3406069.54",
  symbol: "BTC",
};
export const balance = [
  {
    id: 1,
    currency: "USD",
    wallet: "12000",
  },
  {
    id: 2,
    currency: "Bitcoin",
    wallet: "0.0022",
  },
];
export const usdCoinCash = "USD Coin (Cash)";

export const textSearchAllAssets = "Search all assets";
export const timePeriodsSelections: DropDownItem[] = [
  { key: "1H", value: "1h" },
  { key: "24H", value: "24h" },
  { key: "1W", value: "1w" },
  { key: "1M", value: "1m" },
  { key: "1Y", value: "1y" },
];
export const timePeriodsSelectionDefault = "24h";
export const assetsSelections: DropDownItem[] = [
  { key: "ALL", value: "All assets" },
];
export const assetsSelectionDefault = "All assets";
export const totalInvestmentGains = 0.48;
export const participant = "Bob";
export const errorMessage = "Entered amount should not be greater than balance";
