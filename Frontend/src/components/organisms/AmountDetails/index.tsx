import {
  Card,
  makeStyles,
  Slider,
  Typography,
  withStyles,
  Button,
  Box,
  InputBase,
  InputAdornment,
} from "@material-ui/core";
import React, { useEffect } from "react";
import theme from "../../../theme/theme";
import {
  amountDetails,
  dollarSign,
  one,
  equalToSign,
  errorMessage,
} from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";
import { serverCryptoProps } from "../SelectionCard";
import { totalBalType } from "../PaymentMethod";
import { Currency, Wallet } from "../../../types/responseTypes";
const styles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(6),
    width: "100%",
    border: `1px solid ${theme.palette.grey["100"]}`,
    boxSizing: "border-box",
    borderRadius: theme.spacing(1),
  },
  firstCard: {
    paddingTop: "2",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey["100"]}`,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  sliderCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "88px",
    paddingLeft: theme.spacing(5),
  },
  secondCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey["100"]}`,
    borderRadius: theme.spacing(1),
  },

  slider: {
    height: "88px",
    backgroundColor: theme.palette.text.disabled,
    border: `2px solid ${theme.palette.text.disabled}`,
  },
  bitcoinValue: {
    color: theme.palette.text.hint,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "42px",
    border: `1px solid ${theme.palette.primary["500"]}`,
    borderRadius: theme.spacing(1),
  },
  BTCText: {
    color: theme.palette.text.hint,
  },
}));

export type amountEnteredEventHandler = (amount: number) => void;
export type convertedCoinEventHandler = (coinAmount: number) => void;
export type errorMessageHandler = (errorMsg: string) => void;

export interface AmountDetailsProps {
  amountEventHandler: amountEnteredEventHandler;
  selectedCrypto: Currency | undefined;
  amountEntered: number;
  buttonTitle: string;
  convertedCoin: number | undefined;
  convertedCoinHandler: convertedCoinEventHandler;
  totalBal: number | undefined;
  error: string | undefined;
  setErrorHandler: errorMessageHandler;
  cryptoBal: Wallet | undefined;
}

const CustomSlider = withStyles({
  thumb: {
    color: theme.palette.text.disabled,
    border: `1px solid ${theme.palette.text.disabled}`,
  },
  rail: {
    color: theme.palette.text.disabled,
    background: theme.palette.text.disabled,
    border: `1px solid ${theme.palette.text.disabled}`,
  },
  track: {
    color: theme.palette.text.disabled,
    background: theme.palette.text.disabled,
    border: `1px solid ${theme.palette.text.disabled}`,
  },
})(Slider);
const AmountDetails: React.FC<AmountDetailsProps> = ({
  amountEntered,
  amountEventHandler,
  selectedCrypto,
  buttonTitle,
  convertedCoin,
  convertedCoinHandler,
  totalBal,
  error,
  setErrorHandler,
  cryptoBal,
}) => {
  const style = styles();
  let balance: number;
  let cash: number;
  useEffect(() => {
    if (isNaN(amountEntered)) {
      convertedCoinHandler(0);
    }
    console.log(totalBal);
    if (amountEntered && selectedCrypto && cryptoBal) {
      const converted = amountEntered / selectedCrypto.price;
      if (
        convertedCoin &&
        convertedCoin > cryptoBal.amount &&
        buttonTitle === "Sell max"
      ) {
        setErrorHandler(errorMessage);
      } else if (
        totalBal &&
        buttonTitle === "Buy max" &&
        amountEntered > totalBal
      ) {
        setErrorHandler(errorMessage);
      } else {
        setErrorHandler("");
      }
      convertedCoinHandler(converted);
    }
  }, [amountEntered, convertedCoin]);
  return (
    <>
      <Card className={style.root} variant="outlined">
        <Typography variant="body1">{amountDetails}</Typography>
        <Card className={style.firstCard} variant="outlined">
          <Box display="flex" flexDirection="column">
            <InputBase
              placeholder="Enter Amount"
              value={amountEntered ? amountEntered : ""}
              onChange={(event) =>
                amountEventHandler(parseInt(event.target.value))
              }
              startAdornment={
                <InputAdornment position="start">
                  <Typography variant="subtitle1">{dollarSign}</Typography>
                </InputAdornment>
              }
            />
            {error && (
              <Typography
                variant="overline"
                style={{ color: theme.palette.error.main }}
              >
                {error}
              </Typography>
            )}
          </Box>
          <Button className={style.button} variant="outlined" color="primary">
            <Typography>{buttonTitle}</Typography>
          </Button>
        </Card>
        <Box className={style.sliderCard}>
          <CustomSlider
            orientation="vertical"
            defaultValue={55}
            min={10}
            max={100}
            step={10}
            track={false}
            disabled
          />
          <Typography className={style.bitcoinValue} variant="caption">
            {one}
            {selectedCrypto?.code}
            {equalToSign}
            {selectedCrypto && localeUtils.formatCurr(selectedCrypto.price)}
          </Typography>
        </Box>
        <Card className={style.secondCard} variant="outlined">
          <Typography variant="subtitle1">
            {convertedCoin ? convertedCoin : 0}
          </Typography>
          <Typography className={style.BTCText} variant="body1">
            {selectedCrypto?.code}
          </Typography>
        </Card>
      </Card>
    </>
  );
};

export default AmountDetails;
