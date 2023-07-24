import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../../theme/theme";
import charts from "../../../assets/icons/donut-chart-line.svg";
import graph from "../../../assets/icons/line-chart-line.svg";
import MultiCurrencyChart from "../../molecules/ComparisionChart";
import {
  timePeriods,
  portfolioValue,
  totalInvestmentGains,
} from "../../../utils/constants";
import ChangeRateView from "../../molecules/ChangeRateView";
import TimePeriodTab, {
  TimePeriodChangeEventHandler,
} from "../../molecules/TimePeriodTab";
import localeUtils from "../../../utils/locale-utils";

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(4),
  },
  totalInvestment: {
    display: "flex",
    color: theme.palette.text.hint,
  },
  graphStats: {
    display: "flex",
  },
  firstBox: {
    marginRight: theme.spacing(6),
  },
  secondBox: {
    marginLeft: theme.spacing(6),
  },
  verticalLine: {
    height: "54px",
    border: `1px solid ${theme.palette.grey[100]}`,
  },
});

export type PortfolioProps = {
  selectedIndexes?: any;
  data?: any;
  totalInvestment?: any;
  totalGains?: any;
  onChangeTimePeriod?: TimePeriodChangeEventHandler;
  timePeriod?: string;
  price: number | undefined;
};

const PortfolioValue: React.FC<PortfolioProps> = ({
  selectedIndexes,
  data,
  totalInvestment,
  totalGains,
  onChangeTimePeriod,
  timePeriod,
  price,
}) => {
  const classes = useStyles();

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("1M");
  const onClickTimePeriod: TimePeriodChangeEventHandler = (tp) => {
    setSelectedTimePeriod(tp);
    if (onChangeTimePeriod) onChangeTimePeriod(tp);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: theme.spacing(4), marginTop: theme.spacing(4) }}
      >
        <Grid item>
          <Typography variant="subtitle1">{portfolioValue[0]}</Typography>
        </Grid>
        <Grid item style={{ marginRight: theme.spacing(4) }}>
          <img src={charts} style={{ marginRight: theme.spacing(2) }} />
          <img src={graph} />
        </Grid>
      </Grid>
      <Card className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box className={classes.graphStats}>
              <Box className={classes.firstBox}>
                <Box className={classes.totalInvestment}>
                  <Typography variant="caption">{portfolioValue[1]}</Typography>
                  <ChangeRateView changeRate={totalInvestmentGains} />
                </Box>
                <Typography variant="h6">
                  {localeUtils.formatCurr(parseFloat(totalInvestment))}
                </Typography>
              </Box>
              <Box className={classes.verticalLine}></Box>
              <Box className={classes.secondBox}>
                <Box className={classes.totalInvestment}>
                  <Typography variant="caption">{portfolioValue[2]}</Typography>
                  <ChangeRateView changeRate={totalGains} />
                </Box>
                <Typography variant="h6">
                  {price && localeUtils.formatCurr(price)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <TimePeriodTab
              timePeriods={timePeriods}
              selectedTimePeriod={selectedTimePeriod}
              onClick={onClickTimePeriod}
            />
          </Grid>
        </Grid>
        {data == undefined ? (
          "No Data"
        ) : (
          <MultiCurrencyChart
            xAxisLabels={data?.xAxisLabels}
            dataArr={data?.dataArr}
          />
        )}
      </Card>
    </>
  );
};

export default PortfolioValue;
