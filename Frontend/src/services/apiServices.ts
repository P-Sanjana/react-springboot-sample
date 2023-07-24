import axios from "axios";
import {
  Currencies,
  Currency,
  CurrencyPrice,
  PortfolioChanges,
  Wallet,
  Watchlist,
} from "../types/responseTypes";
const baseUrl = process.env.REACT_APP_BASEURL;

export const getUser = async () => {
  const user = await axios.get(`${process.env.REACT_APP_BASEURL}/users/me`);
  return user.data;
};

export const getCurrencies = async (): Promise<Array<Currency>> => {
  const currencies = await axios.get<Array<Currency>>(`${baseUrl}/currencies`);
  return currencies.data;
};

export const getCurrencyById = async (id: number): Promise<Currency> => {
  const currency = await axios.get<Currency>(`${baseUrl}/currencies/${id}`);
  return currency.data;
};

export const getCurrencyPrices = async (id: number, past: number) => {
  const currencyPrices = await axios.get<Array<CurrencyPrice>>(
    `${baseUrl}/currencies/${id}/prices?past=${past}`,
  );
  return currencyPrices.data;
};
export const getWatchlist = async (past?: number) => {
  let watchlist;
  if (past)
    watchlist = await axios.get<Array<Watchlist>>(
      `${baseUrl}/watchlist?past=${past}`,
    );
  else watchlist = await axios.get<Array<Watchlist>>(`${baseUrl}/watchlist`);
  return watchlist.data;
};
export const putWatchlist = async (
  currencyId: number,
  watch: boolean,
): Promise<void> => {
  const watchReq = {
    currencyId,
    watch,
  };
  axios.put(`${baseUrl}/watchlist`, [watchReq]);
};

export const getWallets = async () => {
  const wallets = await axios.get<Array<Wallet>>(`${baseUrl}/wallets`);
  return wallets.data;
};

export const getWalletById = async (id: number) => {
  const wallet = await axios.get(`${baseUrl}/wallets/${id}`);
  return wallet.data;
};

export const getWalletTransactions = async (
  id: number,
  past?: number,
  pageLength?: number,
  pageOffset?: number,
) => {
  let walletTransactions;
  if (past && pageLength) {
    walletTransactions = axios.get(
      `${baseUrl}/wallets/${id}/transactions?past=${past}&pageLength=${pageLength}&pageOffset=${pageOffset}`,
    );
  } else if (past) {
    walletTransactions = axios.get(
      `${baseUrl}/wallets/${id}/transactions?past=${past}`,
    );
  } else if (pageLength) {
    walletTransactions = axios.get(
      `${baseUrl}/wallets/${id}/transactions?pageLength=${pageLength}&pageOffset=${pageOffset}`,
    );
  } else
    walletTransactions = axios.get(`${baseUrl}/wallets/${id}/transactions`);
  return (await walletTransactions).data;
};
export const getTransactions = async (
  pageLength?: number,
  pageOffset?: number,
) => {
  let transactions;
  if (pageLength)
    transactions = await axios.get(
      `${baseUrl}/transactions?pageLength=${pageLength}&pageOffset=${pageOffset}`,
    );
  else transactions = await axios.get(`${baseUrl}/transactions`);
  return transactions.data;
};

export const getPortfolio = async () => {
  const portfolio = await axios.get(`${baseUrl}/portfolio`);
  return portfolio.data;
};

export const getPortfolioById = async (id: number) => {
  const portfolio = await axios.get(`${baseUrl}/portfolio/${id}`);
  return portfolio.data;
};

export const getPortfolioChanges = async (
  id: number,
  past: number,
): Promise<PortfolioChanges[]> => {
  const portfolioChanges = await axios.get<PortfolioChanges[]>(
    `${baseUrl}/portfolio/${id}/changes?past=${past}`,
  );
  return portfolioChanges.data;
};
export const postBuy = async (buy: any) => {
  const buyTransaction = await axios.post(`${baseUrl}/buy`, buy);
  return buyTransaction.data;
};
export const postSell = async (sell: any) => {
  const sellTransaction = await axios.post(`${baseUrl}/sell`, sell);
  return sellTransaction.data;
};
