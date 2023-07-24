import { Box, makeStyles, Typography, Paper, Chip } from "@material-ui/core";
import React from "react";
import { watchlistChart } from "../../../pages/DashboardPage";
import theme from "../../../theme/theme";
import { cardWithGraph } from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";
import ChangeRateView from "../ChangeRateView/index";
import WatchlistItemChart from "../ChartWithDetails";

export type chartPoint = {
  datetime: Date;
  value: number;
};

export type CardWithGraphProps = {
  icon: string;
  currencyType: string;
  currencyValue: string;
  gains: string;
  color?: string;
  graphData: Array<chartPoint>;
  arrowIcon: string;
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "8.125em",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.grey["100"]}`,
    boxSizing: "border-box",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.paper,
  },
  currency: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(4),
  },
  timePeriod: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.grey["50"],
    height: "18px",
    width: "45px",
  },
  currencyImage: {
    width: "42px",
    height: "42px",
    borderRadius: "100px",
    margin: theme.spacing(0, 3, 2, 0),
  },
  details: {
    display: "flex",
  },
  temp: {
    display: "flex",
    flexDirection: "column",
  },
  graph: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  graphBox: {
    width: "18vw",
    padding: theme.spacing(2),
  },
});

const CardWithGraph: React.FC<watchlistChart> = ({
  icon,
  currencyType,
  currencyValue,
  gains,
  graphData,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.details}>
        <Box>
          <img
            src={icon}
            className={classes.currencyImage}
            alt="currency image"
            data-testid="currencyAvatar"
          />
        </Box>

        <Box className={classes.temp}>
          <Typography
            variant="body1"
            className={classes.currency}
            component="div"
          >
            <Box>{currencyType}</Box>
            <Box>{localeUtils.formatCurr(currencyValue)}</Box>
          </Typography>

          <Chip
            size="small"
            label={cardWithGraph[0]}
            className={classes.timePeriod}
          />
        </Box>
      </Box>

      <Box className={classes.graph}>
        <Box style={{ alignSelf: "flex-end" }}>
          {gains && <ChangeRateView changeRate={gains} />}
        </Box>
        <Paper
          elevation={0}
          className={classes.graphBox}
          style={{ height: "60px" }}
        >
          <WatchlistItemChart
            data={graphData}
            color={
              gains > 0 ? theme.palette.success.main : theme.palette.error.main
            }
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CardWithGraph;
