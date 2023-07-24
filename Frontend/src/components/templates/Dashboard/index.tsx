import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import theme from "../../../theme/theme";

const useStyles = makeStyles({
  leftSide: {
    marginLeft: theme.spacing(6),
    width: "65%",
  },
  chipSide: {
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(2),
    width: "65%",
  },
  rightSide: {
    marginLeft: theme.spacing(6),
    marginRight: "-24px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "30%",
  },
  leftSidePortfolio: {
    marginLeft: theme.spacing(7),
    width: "65%",
  },
  rightSidePortfolio: {
    marginLeft: theme.spacing(7),
    marginRight: "-24px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "30%",
  },
  parent: {
    backgroundColor: "#FAFCFF",
    overflowX: "hidden",
  },
});

export interface DashboardTemplateProps {
  watchlist: React.ReactNode;
  myportfolio: React.ReactNode;
  portfoliovalue: React.ReactNode;
  mywallet: React.ReactNode;
  recenttransactions: React.ReactNode;
  currencychip: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  watchlist,
  myportfolio,
  portfoliovalue,
  mywallet,
  recenttransactions,
  currencychip,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.parent} data-testid="dashboard">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
        spacing={4}
      >
        <Grid item style={{}} className={classes.leftSide}>
          {watchlist}
        </Grid>
        <Grid item style={{}} className={classes.rightSidePortfolio}>
          {myportfolio}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
        spacing={2}
      >
        <Grid item className={classes.leftSidePortfolio}>
          {portfoliovalue}
        </Grid>
        <Grid item className={classes.rightSide}>
          {mywallet}
          {recenttransactions}
        </Grid>
      </Grid>

      <Grid item className={classes.chipSide}>
        {currencychip}
      </Grid>
    </Box>
  );
};

export default DashboardTemplate;
