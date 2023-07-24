//Get these values from environmantal variable
const CURRENCY_SYMBOL = "$";
const LOCALE = "en-US";

const localeUtils = {
  formatCurr: (n: number): string => {
    if (!n) {
      return `${CURRENCY_SYMBOL}0`;
    }
    return `${CURRENCY_SYMBOL}${n.toLocaleString(LOCALE)}`;
  },

  formatNumber: (n: number): string => {
    if (!n) {
      return "0";
    }
    return n.toLocaleString(LOCALE);
  },
  formatDatetime24h: (d: Date): string => {
    return d.toLocaleString(LOCALE, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
    });
  },
  formatDateMonth: (d: Date): string => {
    return d.toLocaleString(LOCALE, {
      day: "2-digit",
      month: "short",
    });
  },
  abbreviateCurrency: function (number: number) {
    return `${CURRENCY_SYMBOL}${this.abbreviateNumber(number)}`;
  },
  abbreviateNumber: (number: number) => {
    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return `${number}`;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return `${scaled.toFixed(1) + suffix}`;
  },
};
const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

export default localeUtils;
