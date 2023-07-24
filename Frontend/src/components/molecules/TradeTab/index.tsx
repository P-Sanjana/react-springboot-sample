import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  Avatar,
  Box,
} from "@material-ui/core";
import { Star, StarBorderOutlined } from "@material-ui/icons";
import Bitcoin from "../../../assets/coinImage/bitcoin.png";
import theme from "../../../theme/theme";

export type TradeTabProps = {
  name: string;
  price: string;
  change: string;
  marketCap: string;
  watch: boolean;
  shortName: string;
};

const TradeTab: React.FC<TradeTabProps> = ({
  name,
  price,
  change,
  marketCap,
  watch,
  shortName,
}) => {
  const useStyles = makeStyles({
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "16px24px",
      height: "74px",
      border: `1px solid ${theme.palette.grey[100]}`,
      boxSizing: "border-box",
      borderRadius: "4px",
      margin: "12px0px",
      paddingTop: "20px",
    },
    nameStyle: {
      display: "flex",
      flexDirection: "row",
    },
    shortNameStyle: {
      height: "14px",
      paddingBottom: "20px",
      order: 1,
      margin: "0px 15px",
      top: "26px",
    },
    avatar: {
      width: "32px",
      height: "32px",
      left: "10px",
      borderRadius: "100px",
    },
    nameTextStyle: {
      width: "138px",
      height: "22px",
      margin: "0px 15px",
      overflow: "hidden",
    },
    priceStyle: {
      width: "170px",
      height: "22px",
      margin: "4px 0px",
      overflow: "hidden",
    },
    changeStyle: {
      width: "150px",
      height: "22px",
      left: "661px",
      top: "30px",
      color:
        parseInt(change) > 0
          ? theme.palette.success["500"]
          : theme.palette.error["500"],
      overflow: "hidden",
    },
    marketCapStyle: {
      width: "130px",
      height: "22px",
      left: "899px",
      top: "30px",
      color: theme.palette.text.primary,
      overflow: "hidden",
    },
    columnContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container spacing={2} xs={12}>
        <Grid item xs={3} sm={3}>
          <Box className={classes.nameStyle}>
            <Avatar className={classes.avatar} src={Bitcoin} />
            <Box className={classes.columnContent}>
              <Typography
                className={classes.nameTextStyle}
                variant="body1"
                data-testid="coinType"
              >
                {name}
              </Typography>

              <Typography
                variant="overline"
                className={classes.shortNameStyle}
                data-testid="coinTypeShort"
              >
                {shortName}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Typography
            className={classes.priceStyle}
            variant="body2"
            data-testid="price"
          >
            ${price}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={3}>
          <Typography
            className={classes.changeStyle}
            variant="body2"
            data-testid="change"
          >
            {change}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography
            className={classes.marketCapStyle}
            variant="body2"
            data-testid="marketCap"
          >
            ${marketCap}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1}>
          {watch ? (
            <Star data-testid="watch" color="primary" />
          ) : (
            <StarBorderOutlined data-testid="watch" />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default TradeTab;
