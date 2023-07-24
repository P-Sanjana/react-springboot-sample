import React, { useState } from "react";
import { Grid, Box, makeStyles, Typography, Card } from "@material-ui/core";
import Truck from "../../../assets/icons/truck-line.svg";
import Down from "../../../assets/icons/chevron-down.svg";
import { deliveryFee } from "../../../utils/constants";
import theme from "../../../theme/theme";

const useStyles = makeStyles({
  currency: {
    display: "flex",
    flexDirection: "column",
  },
  imageBox: {
    alignItems: "center",
    display: "flex",
  },
  currencyCode: {
    color: `${theme.palette.text.secondary}`,
  },
  currencyImage: {
    width: "22px",
    height: "22px",
    borderRadius: "500px",
    margin: theme.spacing(0, 2),
  },
  content: {
    display: "flex",
  },
  parentCard: {
    width: "100%",
    borderStyle: "solid",
    borderColor: "rgba(232, 232, 247, 1)",
    borderWidth: "1px",
    padding: theme.spacing(5),
  },
  card: {
    width: "100%",
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    borderStyle: "solid",
    borderColor: "rgba(232, 232, 247, 1)",
    borderWidth: "1px",
  },
  cards: {
    width: "100%",
    padding: theme.spacing(2),
    borderStyle: "solid",
    borderColor: "rgba(232, 232, 247, 1)",
    borderWidth: "1px",
    height: "74px",
  },
  arrow: {
    margin: theme.spacing(2),
  },
});

const DeliveryComponent: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Card className={classes.parentCard} variant="outlined">
      <Typography
        variant="body1"
        style={{
          color: "rgba(52, 52, 70, 1)",
          fontWeight: "bold",
          margin: theme.spacing(2),
        }}
      >
        {deliveryFee[0]}
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.cards}
      >
        <Grid item className={classes.content}>
          <Box className={classes.imageBox}>
            <img
              src={Truck}
              className={classes.currencyImage}
              alt="currency image"
            />
          </Box>

          <Box className={classes.currency}>
            <Typography
              variant="body1"
              style={{ color: "rgba(52, 52, 70, 1)", fontWeight: "bold" }}
            >
              {deliveryFee[1]}
            </Typography>

            <Typography variant="caption" className={classes.currencyCode}>
              {deliveryFee[2]}
            </Typography>
          </Box>
        </Grid>

        <Grid item className={classes.arrow}>
          <img
            src={Down}
            onClick={() => {
              setOpen(!open);
            }}
          />
        </Grid>
      </Grid>
      {open === true ? (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.cards}
          >
            <Grid item className={classes.content}>
              <Typography
                variant="body1"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[3]}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {deliveryFee[4]}
              </Typography>
            </Grid>

            <Grid item className={classes.arrow}>
              <Typography
                variant="caption"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[5]}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.cards}
            style={{ marginBottom: open ? "0" : theme.spacing(3) }}
          >
            <Grid item className={classes.content}>
              <Typography
                variant="body1"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[6]}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {deliveryFee[7]}
              </Typography>
            </Grid>

            <Grid item className={classes.arrow}>
              <Typography
                variant="caption"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[8]}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.cards}
          >
            <Grid item className={classes.content}>
              <Typography
                variant="body1"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[9]}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {deliveryFee[10]}
              </Typography>
            </Grid>

            <Grid item className={classes.arrow}>
              <Typography
                variant="caption"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[11]}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.cards}
          >
            <Grid item className={classes.content}>
              <Typography
                variant="body1"
                style={{ color: "rgba(125, 125, 137, 1)" }}
              >
                {deliveryFee[12]}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Card>
  );
};

export default DeliveryComponent;
