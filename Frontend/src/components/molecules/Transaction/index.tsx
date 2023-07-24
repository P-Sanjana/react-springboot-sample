import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Chip,
  Grid,
  styled,
} from "@material-ui/core";
import theme from "../../../theme/theme";
import localeUtils from "../../../utils/locale-utils";

export type TransactionProps = {
  date: string;
  statusIcon: string;
  coin: string;
  symbol: string;
  chipLabel: string;
  coinAmount: number;
  price: number;
  iconBgColor: string;
};

const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

const Transaction: React.FC<TransactionProps> = ({
  date,
  statusIcon,
  coin,
  symbol,
  chipLabel,
  coinAmount,
  price,
  iconBgColor,
}) => {
  const useStyles = makeStyles({
    rowContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    date: {
      height: theme.spacing(4),
      color: theme.palette.text.primary,
    },
    coin: {
      height: "22px",
      color: theme.palette.text.primary,
      margin: theme.spacing(2, 0),
    },
    statusIcon: {
      width: "44px",
      height: "44px",
      borderRadius: "100px",
      backgroundColor: iconBgColor,
    },
    chip: {
      color: theme.palette.grey["500"],
      backgroundColor: theme.palette.grey["100"],
    },
    coinAmount: {
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(2),
    },
    price: {
      color: theme.palette.text.hint,
    },
    columnContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Caption2Typography
            className={classes.date}
            variant="caption"
            data-testid="date"
          >
            {date}
          </Caption2Typography>
        </Box>
        <Box className={classes.rowContent}>
          <Grid item xs={2} alignItems="center">
            <img
              src={statusIcon}
              className={classes.statusIcon}
              data-testid="status"
            />
          </Grid>
          <Grid item xs={10}>
            <Box>
              <Typography
                variant="body1"
                className={classes.coin}
                data-testid="currency"
              >
                {coin} {symbol}
              </Typography>
              <Chip size="small" label={chipLabel} className={classes.chip} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              className={classes.columnContent}
              style={{ alignItems: "flex-end" }}
            >
              <Typography variant="body1" className={classes.coinAmount}>
                {chipLabel === "Sold"
                  ? `-${localeUtils.formatCurr(coinAmount)}`
                  : `+${localeUtils.formatCurr(coinAmount)}`}
                {symbol}
              </Typography>
              <Caption2Typography variant="caption" className={classes.price}>
                {chipLabel === "Sold"
                  ? `+${localeUtils.formatCurr(price)}`
                  : `-${localeUtils.formatCurr(price)}`}
              </Caption2Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Transaction;
