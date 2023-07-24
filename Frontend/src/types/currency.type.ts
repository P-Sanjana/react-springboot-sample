export type Currency = {
  id: number;
  name: string;
  code: string;
  color: string;
  logoUrl: string;
  watch: boolean;
};

export interface CurrencySummary extends Currency {
  price: number;
  priceSymbol: string;
  changeRate: number;
  marketCapStr: string;
  marketCap: number;
  vol24h: string;
  circulatingSupply: string;
}

