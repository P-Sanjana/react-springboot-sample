import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import PortfolioCard from "../../molecules/CardWithInvestDetails";
import charts from "../../../assets/icons/donut-chart-line.svg";
import menu from "../../../assets/icons/list-view-icon.svg";
import { myPortfolio } from "../../../utils/constants";
import theme from "../../../theme/theme";
import localeUtils from "../../../utils/locale-utils";
import { Portfolio, Currency } from "../../../types/responseTypes";

const useStyles = makeStyles({
  dashboard: {
    display: "flex",
    marginLeft: theme.spacing(4),
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  charts: {
    marginRight: theme.spacing(1),
  },
  menuImage: {
    color: theme.palette.primary[500],
  },
  totalBalance: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[100],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderLeftStyle: "none",
    borderRightStyle: "none",
    paddingLeft: theme.spacing(2),
  },
  parent: {
    marginTop: theme.spacing(2),
  },
  render: {
    marginTop: theme.spacing(2),
    overflow: "auto",
    height: "14.75em",
  },
  cards: {
    marginTop: theme.spacing(3),
  },
});

export type CardProps = {
  icon: string;
  currencyType: string;
  currencyCode: string;
  currencyValue: string;
  gains: number | undefined;
  color: string;
};

export type MyPortfolioProps = {
  portfolioCards: Portfolio[] | undefined;
  totalBalance?: number;
  currencies?: Currency[];
};

const MyPortfolio: React.FC<MyPortfolioProps> = ({
  portfolioCards,
  totalBalance,
  currencies,
}) => {
  const classes = useStyles();
  console.log(currencies);

  const renderPortfolioCards = () => {
    return portfolioCards?.map((element, index) => {
      if (currencies && index < currencies.length) {
        return (
          <Grid item key={index} className={classes.cards}>
            <PortfolioCard
              icon={currencies[index].logoUrl}
              currencyType={currencies[index].name}
              currencyCode={currencies[index].code}
              currencyValue={element.investedAmount}
              gains={element.changeRate}
              color={
                element.changeRate > 0
                  ? theme.palette.success["500"]
                  : theme.palette.error["500"]
              }
            ></PortfolioCard>
          </Grid>
        );
      }
    });
  };
  return (
    <Box>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.parent}
      >
        <Grid item>
          <Box className={classes.dashboard}>
            <Typography
              variant="body1"
              style={{ color: "rgba(52, 52, 70, 1)", fontWeight: "bold" }}
            >
              {myPortfolio[0]}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.icons}>
            <Box className={classes.charts}>
              <img src={charts} alt="charts" />
            </Box>
            <Box>
              <img src={menu} alt="menu" className={classes.menuImage} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Box className={classes.render}>{renderPortfolioCards()}</Box>
      </Grid>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.totalBalance}
      >
        <Grid item>
          <Typography
            variant="body1"
            style={{ color: "rgba(125, 125, 137, 1)" }}
          >
            {myPortfolio[1]}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {totalBalance && localeUtils.formatCurr(totalBalance)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPortfolio;
