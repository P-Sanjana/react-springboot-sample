import { ListProps } from "./index";
import bitcoin from "../../../assets/coinImage/bitcoin.png";
import downArrow from "../../../assets/icons/arrow-right-down-line.svg";
import theme from "../../../theme/theme";
import upArrow from "../../../assets/icons/arrow-right-up-line.svg";
import { chartPoint } from "../../molecules/CardWithGraph";

const randomDataGenerator = (n: number): chartPoint[] => {
  const data: chartPoint[] = [];
  const now = Date.now();
  for (let i = n; i >= 0; i--) {
    data.push({
      datetime: new Date(now - i * 3600000),
      value: Math.floor(Math.random() * 1000 + 1),
    });
  }
  console.log(data);
  return data;
};
