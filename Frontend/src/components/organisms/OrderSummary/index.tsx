import React from "react";
import { Box, makeStyles, Typography, styled } from "@material-ui/core";
import theme from "../../../theme/theme";
import { OrderSummaryConsts, one, equalToSign } from "../../../utils/constants";
import ButtonComponent from "../../atoms/Button";
import Truck from "../../../assets/icons/truck-line.svg";
import IconComponent from "../../atoms/Icon/IconComponent";
import { serverCryptoProps } from "../SelectionCard";
import localeUtils from "../../../utils/locale-utils";
import { totalBalType } from "../PaymentMethod";
import { Currency } from "../../../types/responseTypes";

export type OrderSummaryProps = {
  cryptoTransactionUnits: number | undefined;
  selectedCrypto: Currency | undefined;
  transactionAmount: number | undefined;
  transactionFee: string;
  color: string | undefined;
  payingThroughIcon: string;
  depositToIcon: string;
  transactionTypeButton: string;
  transactionTypeHeader: string;
  error: string | undefined;
  btnClicked: any;
};

const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cryptoTransactionUnits,
  selectedCrypto,
  transactionAmount,
  transactionFee,
  color,
  payingThroughIcon,
  depositToIcon,
  transactionTypeButton,
  transactionTypeHeader,
  error,
  btnClicked,
}) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "646px",
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.grey[100]}`,
      backgroundColor: theme.palette.secondary.contrastText,
    },
    paper1: {
      borderBottom: "1px solid ",
      borderBottomColor: `${theme.palette.grey[100]}`,
      height: "150px",
      textAlign: "center",
      padding: theme.spacing(0, 6),
    },
    paper2: {
      borderBottom: "1px solid",
      borderBottomColor: `${theme.palette.grey[100]}`,
      height: "254px",
      padding: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
    },
    paper3: {
      height: "242px",
      padding: theme.spacing(0, 6),
    },
    paper1Text1: {
      color: `${theme.palette.text.secondary}`,
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(3),
    },
    paper1Text2: {
      color: `${theme.palette.text.primary}`,
      paddingBottom: theme.spacing(3),
    },
    paper1Text3: {
      color: `${theme.palette.text.secondary}`,
    },
    paper2Text1: {
      color: `${theme.palette.text.primary}`,
      fontWeight: 600,
    },
    paper2Text2: {
      color: `${theme.palette.text.secondary}`,
    },
    paper3Text1: {
      color: `${theme.palette.text.primary}`,
      paddingTop: theme.spacing(6),
    },
    paper3Text2: {
      color: `${theme.palette.text.primary}`,
      paddingTop: theme.spacing(4),
    },
    paper3Text3: {
      color: `${theme.palette.text.primary}`,
      paddingTop: theme.spacing(4),
      fontWeight: 600,
    },
    dot: {
      borderBottom: "dotted 2px",
      borderBottomColor: `${theme.palette.grey[300]}`,
      width: "60%",
      margin: theme.spacing(0, 2),
    },
    wrap: {
      display: "flex",
      justifyContent: "space-between",
    },
    btn: {
      marginTop: theme.spacing(6),
      width: "100%",
      backgroundColor: color,
      color: theme.palette.secondary.contrastText,
      textDecoration: "none",
    },
    stepperRoot: {
      display: "flex",
    },
    icon: {
      paddingLeft: theme.spacing(2),
    },
    iconRoot: {
      height: "42px",
      width: "42px",
      backgroundColor: `${theme.palette.grey[50]}`,
      borderRadius: "100px",
      display: "flex",
      justifyContent: "center",
    },
    line: {
      borderLeft: "1px dashed",
      borderLeftColor: `${theme.palette.grey[300]}`,
      height: "64px",
      marginLeft: theme.spacing(5),
    },
  });
  const classes = useStyles();
  const totalAmount = transactionAmount
    ? parseInt(transactionFee) + transactionAmount
    : 1000;
  return (
    <Box className={classes.root} component="div" data-testid="maincontent">
      <Box className={classes.paper1}>
        <Typography
          variant="caption"
          className={classes.paper1Text1}
          component="div"
        >
          {OrderSummaryConsts[0]}
          {transactionTypeHeader}
        </Typography>
        <Typography
          variant="h6"
          className={classes.paper1Text2}
          component="div"
        >
          {cryptoTransactionUnits ? cryptoTransactionUnits : 0}{" "}
          {selectedCrypto?.code}
        </Typography>
        <Typography
          variant="caption"
          className={classes.paper1Text3}
          component="div"
        >
          {one} {selectedCrypto?.code}
          {equalToSign}
          {selectedCrypto && localeUtils.formatCurr(selectedCrypto.price)}
        </Typography>
      </Box>

      <Box className={classes.paper2}>
        <Box className={classes.stepperRoot}>
          <Box className={classes.iconRoot}>
            <IconComponent icon={payingThroughIcon} />
          </Box>
          <Box className={classes.icon}>
            <Caption2Typography
              variant="caption"
              className={classes.paper2Text2}
            >
              {OrderSummaryConsts[4]}
            </Caption2Typography>
            <br />
            <Typography variant="body1" className={classes.paper2Text1}>
              {transactionTypeButton === "Sell now"
                ? `${selectedCrypto?.name} ${OrderSummaryConsts[9]}`
                : OrderSummaryConsts[5]}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.line} component="div" />
        <Box className={classes.stepperRoot}>
          <Box className={classes.iconRoot}>
            <IconComponent icon={Truck} />
          </Box>
          <Box className={classes.icon}>
            <Caption2Typography
              variant="caption"
              className={classes.paper2Text2}
            >
              {OrderSummaryConsts[6]}
            </Caption2Typography>
            <br />
            <Typography variant="body1" className={classes.paper2Text1}>
              {OrderSummaryConsts[7]} {selectedCrypto?.code}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.line} component="div" />
        <Box className={classes.stepperRoot}>
          <Box className={classes.iconRoot}>
            <IconComponent icon={depositToIcon} />
          </Box>
          <Box className={classes.icon}>
            <Caption2Typography
              variant="caption"
              className={classes.paper2Text2}
            >
              {OrderSummaryConsts[8]}
            </Caption2Typography>
            <br />
            <Typography variant="body1" className={classes.paper2Text1}>
              {transactionTypeButton === "Buy now"
                ? `${selectedCrypto?.name} ${OrderSummaryConsts[9]}`
                : OrderSummaryConsts[11]}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.paper3}>
        <Box className={classes.wrap}>
          <Typography
            variant="overline"
            className={classes.paper3Text1}
            component="div"
          >
            {cryptoTransactionUnits} {selectedCrypto?.code}
          </Typography>

          <Typography
            variant="overline"
            className={classes.dot}
            component="div"
          ></Typography>

          <Typography
            variant="overline"
            className={classes.paper3Text1}
            component="div"
          >
            {transactionAmount
              ? localeUtils.formatCurr(transactionAmount)
              : localeUtils.formatCurr(0)}
          </Typography>
        </Box>

        <Box className={classes.wrap}>
          <Typography
            variant="overline"
            className={classes.paper3Text2}
            component="div"
          >
            {OrderSummaryConsts[1]}
          </Typography>

          <Typography
            variant="overline"
            className={classes.dot}
            component="div"
          ></Typography>

          <Typography
            variant="overline"
            className={classes.paper3Text2}
            component="div"
          >
            {localeUtils.formatCurr(parseInt(transactionFee))}
          </Typography>
        </Box>

        <Box className={classes.wrap}>
          <Typography
            variant="body1"
            className={classes.paper3Text3}
            component="div"
          >
            {OrderSummaryConsts[2]}
          </Typography>

          <Typography
            variant="overline"
            className={classes.dot}
            component="div"
          ></Typography>

          <Typography
            variant="body1"
            className={classes.paper3Text3}
            component="div"
          >
            {localeUtils.formatCurr(totalAmount)}
          </Typography>
        </Box>

        {totalAmount > 1000 && error === "" ? (
          <ButtonComponent
            className={classes.btn}
            variant="contained"
            onClick={btnClicked}
          >
            {transactionTypeButton}
          </ButtonComponent>
        ) : (
          <ButtonComponent className={classes.btn} variant="contained" disabled>
            {transactionTypeButton}
          </ButtonComponent>
        )}
      </Box>
    </Box>
  );
};

export default OrderSummary;
