import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import PortfolioCard from "../../molecules/CardWithInvestDetails/index";
import { myWallets } from "../../../utils/constants";
import theme from "../../../theme/theme";
import { Link } from "react-router-dom";
import { WALLET } from "../../../utils/routes";

export type MyWalletProps = {
  icon: string;
  currencyType: string;
  currencyCode: string;
  currencyValue: number | undefined;
};

const useStyles = makeStyles({
  title: {
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  Link: {
    textDecoration: "none",
    "&:visited": {
      textDecoration: "none",
      color: "inherit",
    },
    width: "100%",
  },
});

const MyWallet: React.FC<MyWalletProps> = ({
  icon,
  currencyType,
  currencyCode,
  currencyValue,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.title}>
          {myWallets}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to={WALLET} className={classes.Link}>
          <PortfolioCard
            icon={icon}
            currencyCode={currencyCode}
            currencyType={currencyType}
            currencyValue={currencyValue}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default MyWallet;
