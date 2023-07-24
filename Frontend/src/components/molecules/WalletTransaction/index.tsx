import {
  Box,
  Chip,
  makeStyles,
  Typography,
  useTheme,
  styled,
} from "@material-ui/core";
import React from "react";
import { from } from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";

export type WalletCardProps = {
  month: string;
  day: string;
  statusIcon: string;
  coin: string;
  buyer: string;
  coinAmount: number;
  price: number;
  symbol: string;
  iconBgColor: any;
  chipLabel: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  statusIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "100px",
    margin: theme.spacing(0, 3, 0, 3),
  },
  month: {
    color: theme.palette.text.secondary,
  },
  day: {
    color: theme.palette.text.primary,
  },
  coin: {
    color: theme.palette.text.primary,
  },
  buyer: {
    color: theme.palette.text.hint,
  },
  chip: {
    ...theme.typography.caption2,
    backgroundColor: theme.palette.grey["50"],
    color: theme.palette.grey["500"],
    height: "25px",
    padding: theme.spacing(0, 2),
  },
  coinAmount: {
    color: theme.palette.text.primary,
  },
  price: {
    color: theme.palette.text.hint,
  },
}));
const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

export const WalletCard: React.FC<WalletCardProps> = ({
  month,
  day,
  statusIcon,
  coin,
  buyer,
  coinAmount,
  price,
  iconBgColor,
  symbol,
  chipLabel,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="row" className={classes.root}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Caption2Typography
          variant="caption"
          className={classes.month}
          data-testid="month"
        >
          {day}
        </Caption2Typography>
        <Typography
          variant="subtitle2"
          className={classes.day}
          data-testid="day"
        >
          {month}
        </Typography>
      </Box>
      <img
        src={statusIcon}
        className={classes.statusIcon}
        style={{ backgroundColor: iconBgColor }}
      />
      <Box>
        <Typography variant="body1" className={classes.coin} data-testid="coin">
          {coin}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          gridColumnGap={theme.spacing(2)}
          alignItems="center"
        >
          <Caption2Typography
            variant="caption"
            className={classes.buyer}
            data-testid="buyer"
          >
            {from} {buyer}
          </Caption2Typography>
          <Chip size="small" className={classes.chip} label={chipLabel} />
        </Box>
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Typography variant="body1" className={classes.coinAmount}>
          +{coinAmount} {symbol}
        </Typography>
        <Caption2Typography variant="caption" className={classes.price}>
          +{localeUtils.formatCurr(price)}
        </Caption2Typography>
      </Box>
    </Box>
  );
};

export default WalletCard;
