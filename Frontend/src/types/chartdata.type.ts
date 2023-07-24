export type ChartPoint = {
  datetime: Date;
  value: number;
};

export type CurrencyChartData = {
  currencyName: string;
  currencyColor: string;
  data: Array<number>;
};

export type MultiCurrencyData = {
  id: number;
  timePeriod: string,
  xAxisLabels: string[],
  dataArr: Array<CurrencyChartData>
}

