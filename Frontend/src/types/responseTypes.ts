export type User = {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  contactNum: string;
  avatarUrl: string;
};
export type Currency = {
  id: number;
  currencyType: string;
  name: string;
  code: string;
  about: string;
  logoUrl: string;
  color: string;
  price: number;
  marketCap: number;
  marketCapShort: string;
  vol24h: string;
  circulatingSupply: string;
  watch: boolean;
  changeRate: number;
};

export type Currencies = {
  total: number;
  data: Array<Currency>;
};

export type CurrencyPrice = {
  price: number;
  dateTime: string;
};

export type Watchlist = {
  id: number;
  currencyType: string;
  name: string;
  code: string;
  about: string;
  logoImageUrl: string;
  color: string;
  price: number;
  marketCap: number;
  marketCapShort: string;
  vol24h: string;
  circulatingSupply: string;
  watch: boolean;
  changeRate: number;
  historyForPast: string;
  datetime: string;
};

export type Wallet = {
  id: number;
  userId: number;
  currencyId: number;
  currencyType: string;
  amount: number;
};
export type Transaction = {
  id: number;
  userId: number;
  walletId: number;
  currencyId: number;
  currencyName: string;
  currencyCode: string;
  type: string;
  status: string;
  currencyAmount: number;
  amount: number;
  participantName: string;
  datetime: string;
};

export type TransactionResponse = {
  total: number;
  data: Array<Transaction>;
};

export type Portfolio = {
  id: number;
  userId: number;
  currencyId: number;
  investedAmount: number;
  currentAmount: number;
  changeRate: number;
};

export type PortfolioChanges = {
  investedAmount: number;
  changedAmount: number;
  changeRate: number;
  datetime: string;
};
