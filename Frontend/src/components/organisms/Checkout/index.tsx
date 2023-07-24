import React from "react";
import { Grid, Box, makeStyles, Typography } from "@material-ui/core";
import theme from "../../../theme/theme";
import CheckLine from "../../../assets/icons/check-line.svg";
import { checkoutList } from "../../../utils/constants";
import ButtonComponent from "../../atoms/Button";
import { Link } from "react-router-dom";

export type CheckoutProps = {
  total?: any;
  process?: string;
  currency?: string;
};

const useStyles = makeStyles({
  image: {
    width: "64px",
    height: "64px",
    borderRadius: "100px",
    backgroundColor: theme.palette.success["100"]!,
  },
  imgGrid: {
    textAlign: "center",
    justifyContent: "center",
  },
  total: {
    marginTop: "3%",
    textAlign: "center",
    justifyContent: "center",
  },
  btc: {},
  buysellcontent: {
    marginTop: "2%",
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "30%",
    textAlign: "center",
  },
  buttons: {
    margin: "2%",
    width: "30%",
    textAlign: "center",
  },
  button1: {
    marginRight: "5%",
    width: "40%",
    padding: "1%",
    height: "42px",
  },
  button2: {
    marginLeft: "5%",
    width: "40%",
    padding: "1%",
    height: "42px",
  },
  parentBox: {
    width: "100%",
    position: "absolute",
    left: "50%",
    top: "50%",
    webkitTransform: "translate(-50%,-50%)",
    transform: "translate(-50%,-50%)",
  },
});

const CheckoutComponent: React.FC<CheckoutProps> = ({
  total,
  process,
  currency,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.parentBox}>
      <Grid container justifyContent="center">
        <Grid item xs={12} className={classes.imgGrid}>
          <img src={CheckLine} alt="Image" className={classes.image} />
        </Grid>
        <Grid item xs={12} className={classes.total}>
          <Typography variant="h4" className={classes.btc}>
            {total} {currency}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buysellcontent}>
            <Typography variant="body2" className={classes.content}>
              {process === "buy" ? checkoutList[0] : checkoutList[3]}
            </Typography>
          </Box>
        </Grid>
        <Box className={classes.buttons}>
          <ButtonComponent
            variant="outlined"
            color="primary"
            className={classes.button1}
          >
            <Typography variant="caption">
              {process === "buy" ? checkoutList[1] : checkoutList[4]}
            </Typography>
          </ButtonComponent>
          <Link to="/wallet" style={{ textDecoration: "none" }}>
            <ButtonComponent
              variant="contained"
              color="primary"
              className={classes.button2}
            >
              <Typography variant="caption">
                {process === "buy" ? checkoutList[2] : checkoutList[5]}
              </Typography>
            </ButtonComponent>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
};

export default CheckoutComponent;
