import { Currency } from "../types/responseTypes";

export type SortDirection = "asc" | "desc" | "none";

export type SortEventHandler<T> = (
  fieldPicker: FieldPicker<T>,
  direction: SortDirection,
) => void;

export type FieldPicker<T> = (obj: T) => any;

type TableHeader<T> = {
  label: string;
  sort?: boolean;
  sortFieldPicker?: FieldPicker<T>;
};

export const tradeTableHeaders: Array<TableHeader<Currency>> = [
  {
    label: "Name",
  },
  {
    label: "Price",
  },
  {
    label: "Change",
  },
  {
    label: "MarketCap",
    sort: true,
    sortFieldPicker: (curr) => curr.marketCap,
  },
  {
    label: "Watch",
  },
];
