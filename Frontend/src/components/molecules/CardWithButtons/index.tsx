import React from "react";
import { makeStyles, Typography, Grid, Avatar } from "@material-ui/core";
import Usd from "../../../assets/coinImage/USD-icon.svg";
import theme from "../../../theme/theme";
import Button from "../../atoms/Button/index";
import { cashDeposit, withdraw, cash, usdCoin } from "../../../utils/constants";
const useStyles = makeStyles({
  container: {
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey["100"]}`,
    height: "106px",
    marginBottom: "1%",
    "&:hover": {
      boxShadow: "5px 3px 3px rgba(44, 44, 44, 0.08)",
    },
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.contrastText,
  },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "100px",
    margin: theme.spacing(0, 4, 0, 4),
  },
  coin: {
    color: theme.palette.grey["500"],
  },

  coinShortStyle: {
    color: theme.palette.text.hint,
    paddingRight: theme.spacing(1),
  },
  btn: {
    color: theme.palette.primary["500"],
    padding: theme.spacing(0, 4, 0, 4),
  },
});

const depositAndWithdraw: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item container xs sm={2} direction="row">
        <Avatar className={classes.avatar} src={Usd} />
        <Grid item xs sm container direction="column">
          <Grid item xs>
            <Typography
              data-testid="coin"
              className={classes.coin}
              variant="h6"
            >
              {usdCoin}
            </Typography>
            <Grid item xs sm container direction="row" alignItems="center">
              <Typography
                data-testid="coin-short"
                className={classes.coinShortStyle}
                variant="body1"
              >
                {cash}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sm={4}
        xs={4}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid item container xs={6} sm={6} justifyContent="flex-end">
        <Grid item style={{ paddingRight: "7px" }}>
          <Button className={classes.btn} variant="outlined" color="primary">
            <Typography data-testid="btn" variant="button">
              {cashDeposit}
            </Typography>
          </Button>
          &nbsp;&nbsp;
          <Button className={classes.btn} variant="outlined" color="primary">
            <Typography data-testid="btn" variant="button">
              {withdraw}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default depositAndWithdraw;
