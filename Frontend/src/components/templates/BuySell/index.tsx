import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

export type CryptoProps = {
  icon: string;
  currency: string;
  price: string;
  selected: boolean;
};

export type ChooseCryptoProps = {
  data: Array<CryptoProps>;
};

export type BuySellProps = {
  chooseCryptoComponent: JSX.Element;
  paymentComponent: JSX.Element;
  amountDetailsComponent: JSX.Element;
  depositComponent: JSX.Element;
  orderSummaryComponent: JSX.Element;
  deliveryFeeComponent: JSX.Element;
  buy: boolean;
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingLeft: "50px",
    flexGrow: 1,
    marginBottom: "15px",
  },
  gridItem1: {
    width: "50%",
    paddingRight: "10px",
  },
  gridItem2: {
    justifyContent: "flex-end",
    width: "50%",
  },
  item: {
    marginBottom: "5px",
  },
});

const BuySell: React.FC<BuySellProps> = ({
  chooseCryptoComponent,
  paymentComponent,
  amountDetailsComponent,
  orderSummaryComponent,
  deliveryFeeComponent,
  depositComponent,
  buy,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      className={classes.container}
    >
      <Grid
        container
        direction="column"
        spacing={6}
        justifyContent="center"
        className={classes.gridItem1}
      >
        <Grid item data-testid="chooseCrypto" className={classes.item}>
          {chooseCryptoComponent}
        </Grid>
        <Grid item className={classes.item}>
          {paymentComponent}
        </Grid>
        <Grid item data-testid="amountDetails" className={classes.item}>
          {amountDetailsComponent}
        </Grid>
        {buy ? (
          <Grid item className={classes.item}>
            {deliveryFeeComponent}
          </Grid>
        ) : (
          <Grid item className={classes.item}>
            {depositComponent}
          </Grid>
        )}
      </Grid>
      <Grid item className={classes.gridItem2}>
        {orderSummaryComponent}
      </Grid>
    </Grid>
  );
};

export default BuySell;
