import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import theme from "../../../theme/theme";
import { totalBalance, btc } from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";

const styles = makeStyles(() => ({
  root: {
    alignItems: "center",
    height: "60px",
    backgroundColor: theme.palette.grey["50"],
    borderRadius: theme.spacing(1),
  },
  totalBalance: {
    margin: theme.spacing(0, 3),
  },
}));

export interface TotalBalanceProps {
  totalBalanceValueInBTC?: number;
  totalBalanceValueInDollar: number | undefined;
  code?: string;
}

const TotalBalance: React.FC<TotalBalanceProps> = (props) => {
  const { totalBalanceValueInBTC, totalBalanceValueInDollar, code } = props;

  const style = styles();

  const balance = totalBalanceValueInBTC ? (
    <Typography variant="subtitle1">
      {totalBalanceValueInBTC}
      &nbsp;
      {code}&nbsp;{"("}
      {totalBalanceValueInDollar &&
        localeUtils.formatCurr(totalBalanceValueInDollar)}
      {")"}
    </Typography>
  ) : (
    <Grid item xs={10} container justify="flex-end">
      <Grid item style={{ paddingRight: "8px" }} alignItems="center">
        {" "}
        <Box style={{ padding: theme.spacing(1) }}>
          <Typography variant="subtitle1">
            {totalBalanceValueInDollar &&
              localeUtils.formatCurr(totalBalanceValueInDollar)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
  return (
    <Grid container xs={12} className={style.root}>
      <Grid item container xs={2} justify="flex-start" alignItems="center">
        <Grid item>
          <Typography variant="subtitle1" className={style.totalBalance}>
            {totalBalance}
          </Typography>
        </Grid>
      </Grid>
      {balance}
    </Grid>
  );
};

export default TotalBalance;
