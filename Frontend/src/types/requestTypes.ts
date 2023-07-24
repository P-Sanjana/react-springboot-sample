export type Watchlist = {
  currencyId: number;
  watch: boolean;
};

export type Payment = {
  paymentType: string;
  card: string;
  walletId: number;
};

export type buy = {
  currencyId: number;
  currencyAmount: number;
  deliveryType: string;
  paymentMethod: Payment;
};

export type sell = {
  walletId: number;
  currencyAmount: number;
  deliveryType: string;
  depositToCurrencyId: number;
};
