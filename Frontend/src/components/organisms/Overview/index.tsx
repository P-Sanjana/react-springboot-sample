import {
  Box,
  Card,
  CardContent,
  makeStyles,
  styled,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../../theme/theme";
import { CurrencyChartData } from "../../../types/chartdata.type";
import * as constants from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";
import ChangeRateView from "../../molecules/ChangeRateView";
import MultiCurrencyChart from "../../molecules/ComparisionChart";
import TimePeriodTab, {
  TimePeriodChangeEventHandler,
} from "../../molecules/TimePeriodTab";

const ExtraPaddedCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(6),
}));

const useStyles = makeStyles((theme) => ({
  currentValue: {
    marginBottom: theme.spacing(2),
  },
}));

export interface CurrencyOverviewProps {
  currentValue: number;
  timePeriod: string;
  onChangeTimePeriod: TimePeriodChangeEventHandler;
  changeRate: number;
  chartXAxisLabels: Array<string>;
  chartData: CurrencyChartData;
}

const CurrencyOverview: React.FC<CurrencyOverviewProps> = ({
  currentValue,
  timePeriod,
  onChangeTimePeriod,
  changeRate,
  chartXAxisLabels,
  chartData,
}) => {
  const classes = useStyles();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriod);
  const onClickTimePeriod: TimePeriodChangeEventHandler = (tp) => {
    setSelectedTimePeriod(tp);
    onChangeTimePeriod(tp);
  };
  return (
    <Card style={{ backgroundColor: "#FFFFFF" }}>
      <ExtraPaddedCardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box>
            <Typography
              variant="caption"
              style={{ color: theme.palette.text.hint }}
            >
              {constants.currentValue}
            </Typography>
            <Typography
              variant="h6"
              data-testid="current-value"
              className={classes.currentValue}
            >
              {localeUtils.formatCurr(currentValue)}
            </Typography>
            <ChangeRateView changeRate={changeRate} data-testid="rate-value" />
          </Box>
          <Box height="fit-content">
            <TimePeriodTab
              timePeriods={constants.timePeriods}
              selectedTimePeriod={selectedTimePeriod}
              onClick={onClickTimePeriod}
            />
          </Box>
        </Box>
        <MultiCurrencyChart
          xAxisLabels={chartXAxisLabels}
          dataArr={[chartData]}
          showLegends={false}
        />
      </ExtraPaddedCardContent>
    </Card>
  );
};

export default CurrencyOverview;
