import bitcoin from "../assets/coinImage/bitcoin.png";
import theme from "../theme/theme";

export const userProfile = {
  userId: 1,
  userFullname: "John",
  userAvatarUrl:
    "https://s3-alpha-sig.figma.com/img/973c/8b4c/05e06771ca57ec378072223b93fc6007?Expires=1635724800&Signature=LoSuQuAoiSGeFs04cT-kZICbfCNVFSd~jnfp6ffpCUDjKiWkq9dvi61je-5x7~toH3IMbNrCQrfctP-mrlVh~H7iAF-UlMNO66--TqlXExfb91MLGLnuK8O5HONWoVL0cT9Zxqx0iBMifwRo8oY~3f45YVs52Kw2FH8LwZxbYDhZCAev85Kqk7yofawgrWgZoYQJTaS~Re4TV09PF56F4wCcbZm81XaIgCbPDF2vZg~ybhPfMAeUf18TseFlsLPU1tbCigTOF3rPjeU5bSQvaBwJrDSGNUkeEdHxpfqfV4CihwWdxdXms67T5IcnBDlMR~AzVGJL~KIiu4lLZ~Fh5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
};

export const portfolioCards = [
  {
    icon: `${bitcoin}`,
    currencyType: "Bitcoin",
    currencyCode: "BTC",
    currencyValue: "$50000.00",
    gains: "+10.5",
    color: `${theme.palette.success.main}`,
  },
  {
    icon: `${bitcoin}`,
    currencyType: "Bitcoin",
    currencyCode: "BTC",
    currencyValue: "$50000.00",
    gains: "+10.5",
    color: `${theme.palette.success.main}`,
  },
  {
    icon: `${bitcoin}`,
    currencyType: "Bitcoin",
    currencyCode: "BTC",
    currencyValue: "$50000.00",
    gains: "+10.5",
    color: `${theme.palette.success.main}`,
  },
];

export const chips = [
  {
    name: "Bitcoin",
    color: "#F7931A",
    selected: true,
  },
  {
    name: "XRP",
    color: "#222222",
  },
  {
    name: "Polkadot",
    color: "#E6007A",
  },
  {
    name: "Ethereum",
    color: "#627EEA",
  },
  {
    name: "Tether",
    color: "#26A17B",
  },
  {
    name: "Ethereum 2",
    color: "#191971",
  },
  {
    name: "Dodge Coin",
    color: "#DBC984",
  },
];

export const data = {
  xAxisLabels: ["SEP 16", "SEP 24", "SEP 30", "OCT 07", "OCT 14"],
  dataArr: [
    {
      currencyColor: "#F7931A",
      currencyName: "Bitcoin",
      data: [100, 300, 250, 320, 400],
    },
    {
      currencyColor: "#0052FF",
      currencyName: "Total Investment",
      data: [50, 80, 76, 90, 150],
    },
  ],
};
