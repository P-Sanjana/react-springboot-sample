import API from "../API";
import { totalBalType } from "../components/organisms/PaymentMethod";
import { MultiCurrencyData } from "../types/chartdata.type";
import { CurrencySummary } from "../types/currency.type";

export const getCryptos = async () => {
  const cryptos = await API.get("cryptocurrencies");
  return cryptos.data;
};

export const getTotalBalance = async () => {
  const totalBalance = await API.get("totalBalance");
  return totalBalance.data;
};
export const totalBalanceService = async () => {
  const data = await API.get("/user");
  return data.data;
};

export const transactionsService = async () => {
  const data = await API.get("/transactions");
  return data.data;
};

export const coinDataService = async () => {
  const data = await API.get("/currency/0");
  return data.data;
};

export const graphDataService = async (time: number) => {
  const data = await API.get("/graph/" + time);
  return data.data;
};

export const multiGraphDataService = async (
  time: number,
): Promise<Array<MultiCurrencyData>> => {
  const res = await API.get<Array<MultiCurrencyData>>("/multiChart/" + time);
  return res.data;
};

export const watchListData = async () => {
  const data = await API.get("/cardData");
  return data;
};

export const myPortfolioData = async () => {
  const data = await API.get("/multiChart");
  return data;
};

export const recentTransactionsData = async () => {
  const data = await API.get("/recentTransactions");
  return data;
};
export const getCurrencies = async (): Promise<Array<CurrencySummary>> => {
  const res = await API.get<Array<CurrencySummary>>("/currencies");
  return res.data;
};

export const setWatchItem = async (
  userId: number,
  currencyId: number,
  watch: boolean,
): Promise<void> => {
  // Uncomment when the API is implemented
  // const data = {
  //   currencyId: currencyId,
  //   watch: watch,
  // }
  // await API.put(`/users/${userId}/watchlist`, data);
};

export const addTransaction = async (transaction: any) => {
  await API.post("/transactions", transaction);
};
