import React from "react";
import { makeStyles, Typography, Box, Grid, Avatar } from "@material-ui/core";
import theme from "../../../theme/theme";
import Button from "../../atoms/Button/index";
import { Star } from "@material-ui/icons";
import {
  addedToWatchList,
  marketcap,
  vol24H,
  circulatingsupply,
} from "../../../utils/constants";
import ChangeRateView from "../ChangeRateView/index";
import localeUtils from "../../../utils/locale-utils";

export type CardWithStatsProps = {
  coin: string;
  coinShort: string;
  marketCap: string;
  vol: string;
  circulatingSupply: string;
  changeRate?: string;
  coinIcon: string;
};

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
  statValues: {
    color: theme.palette.text.primary,
    margin: theme.spacing(2, 2, 0, 2),
  },
  statHeaders: {
    color: theme.palette.text.hint,
    margin: theme.spacing(2),
  },
  verticalLine: {
    width: theme.spacing(0),
    height: "45px",
    border: `1px solid ${theme.palette.grey["300"]}`,
    marginLeft: theme.spacing(5),
  },
  coinShortStyle: {
    color: theme.palette.text.hint,
    paddingRight: theme.spacing(1),
  },
  btn: {
    color: theme.palette.primary["500"],
    padding: theme.spacing(0, 4, 0, 4),
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(3),
  },
});

const CardWithStats: React.FC<CardWithStatsProps> = ({
  coin,
  coinShort,
  marketCap,
  vol,
  circulatingSupply,
  changeRate,
  coinIcon,
}) => {
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
        <Avatar className={classes.avatar} src={coinIcon} />
        <Grid item xs sm container direction="column">
          <Grid item xs>
            <Typography
              data-testid="coin"
              className={classes.coin}
              variant="h6"
            >
              {coin}
            </Typography>
            <Grid item xs sm container direction="row" alignItems="center">
              <Typography
                data-testid="coin-short"
                className={classes.coinShortStyle}
                variant="body1"
              >
                {coinShort}
              </Typography>
              {changeRate && (
                <ChangeRateView changeRate={parseFloat(changeRate)} />
              )}
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
        <Grid item xs={2}>
          <Box className={classes.verticalLine}></Box>
        </Grid>
        <Grid item container sm xs={2} direction="row">
          <Grid item>
            <Typography
              data-testid="market-cap"
              variant="caption"
              className={classes.statHeaders}
            >
              {marketcap}
            </Typography>
            <Typography className={classes.statValues} variant="body1">
              {localeUtils.abbreviateCurrency(parseFloat(marketCap))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              data-testid="vol"
              variant="caption"
              className={classes.statHeaders}
            >
              {vol24H}
            </Typography>
            <Typography className={classes.statValues} variant="body1">
              {localeUtils.abbreviateCurrency(parseFloat(vol))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              data-testid="circulating-supply"
              variant="caption"
              className={classes.statHeaders}
            >
              {circulatingsupply}
            </Typography>
            <Typography variant="body1" className={classes.statValues}>
              {`${localeUtils.abbreviateNumber(
                parseFloat(circulatingSupply),
              )} ${coinShort}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={6} sm={6} justifyContent="flex-end">
        <Grid item>
          <Button className={classes.btn} variant="outlined" color="primary">
            <Star className={classes.icon} />
            <Typography data-testid="btn" variant="button">
              {addedToWatchList}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardWithStats;
