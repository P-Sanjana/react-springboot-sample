import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ButtonComponent from "../../atoms/Button";
import DropDown from "../DropDown/DropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `2px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(6, 0),
  },
  dashboard: {
    display: "flex",
    marginLeft: theme.spacing(7),
  },
  left: {
    margin: theme.spacing(6),
  },
  right: {
    margin: theme.spacing(6),
  },
  help: {
    display: "flex",
    marginRight: theme.spacing(7),
  },
  dropdown: {
    height: "42px",
  },
  helpButton: {
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7),
    height: "40px",
  },
}));

const dropDownList = [{ key: "English", value: "English" }];

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Box className={classes.dashboard}>
          <Typography variant="body2" color="primary" className={classes.left}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="primary" className={classes.left}>
            Careers
          </Typography>
          <Typography variant="body2" color="primary" className={classes.left}>
            Legacy & Privacy
          </Typography>
          <Typography variant="body2" className={classes.left}>
            © 2021 Minet
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.help}>
          <DropDown
            default="English"
            className={classes.dropdown}
            dropDownList={dropDownList}
          />
          <ButtonComponent
            variant="outlined"
            color="primary"
            className={classes.helpButton}
          >
            Need Help
          </ButtonComponent>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
