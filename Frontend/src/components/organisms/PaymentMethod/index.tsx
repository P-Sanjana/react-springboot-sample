import { Avatar, Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import theme from "../../../theme/theme";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import USDCoin from "../../../assets/coinImage/USD-icon.svg";
import {
  totalBalance,
  defaul,
  dash,
  dollarSign,
  cryptos,
  usdCoinCash,
} from "../../../utils/constants";
import { serverCryptoProps } from "../SelectionCard";
import { Wallet } from "../../../types/responseTypes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.spacing(1),
    height: "166px",
    backgroundColor: theme.palette.background.paper,
  },
  cardTitle: {
    margin: theme.spacing(3, 0),
    marginBottom: theme.spacing(1),
  },
  secondCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(6),
    width: "100%",
    justifyContent: "space-around",
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
    height: "100px",
  },
  icon: {
    width: "32px",
    height: "32px",
    borderRadius: "100px",
  },
  iconName: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    justifyContent: "flex-end",
  },

  balanceValueBitcoin: {
    paddingTop: "2px",
    margin: theme.spacing(0, 2),
    justifyContent: "flex-end",
  },
  totalbalanceInUsd: {
    width: "100%",
    color: theme.palette.text.hint,
    paddingTop: theme.spacing(1),
  },
  iconUsd: {
    width: "100%",
    height: "16px",
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(7),
  },
  default: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  usdIcon: {
    width: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: "100px",
  },
}));

export type totalBalType = {
  id: number;
  currency: string;
  wallet: string;
};

export interface PaymentMethodProps {
  cardTitle: string;
  usdOrTotal: string;
  selectedCrypto?: any;
  totalBal?: number;
  selectedCryptoBal?: Wallet;
}

const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
  const style = useStyles();
  const { cardTitle, usdOrTotal, selectedCrypto, totalBal, selectedCryptoBal } =
    props;
  let icon = USDCoin;
  useEffect(() => {
    icon = selectedCrypto ? selectedCrypto.logoUrl : USDCoin;
  }, [selectedCrypto]);

  const totalBalanceDisplayInUsd: React.ReactElement =
    cardTitle === "Payment Method" ? (
      <Typography className={style.iconUsd} variant="caption">
        {usdCoinCash}
        <Typography className={style.totalbalanceInUsd} variant="subtitle1">
          {totalBalance}
          {dash}
          {dollarSign}
          {totalBal}
        </Typography>
      </Typography>
    ) : (
      <Typography className={style.usdIcon} variant="caption">
        {usdCoinCash}
      </Typography>
    );

  let addElement: React.ReactElement;
  if (usdOrTotal === "t") {
    addElement = (
      <Card className={style.secondCard} variant="outlined">
        <Avatar className={style.icon} src={selectedCrypto?.logoUrl} />
        <Typography className={style.iconName} variant="caption">
          {selectedCrypto?.name}
        </Typography>
        <Typography className={style.balanceValueBitcoin} variant="subtitle1">
          {selectedCryptoBal?.amount}
          {selectedCrypto?.code}
        </Typography>
      </Card>
    );
  } else {
    addElement = (
      <Card className={style.secondCard} variant="outlined">
        <Avatar className={style.icon} src={icon} />
        {totalBalanceDisplayInUsd}
        <Box className={style.default}>
          <Typography
            variant="caption"
            style={{ color: theme.palette.text.hint }}
          >
            {defaul}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Box className={style.root}>
      <Typography className={style.cardTitle} variant="body1">
        {cardTitle}
      </Typography>
      {addElement}
    </Box>
  );
};
export default PaymentMethod;
