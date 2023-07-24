import { Grid, makeStyles, Box } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3),
  },
}));

export type detailTemplate = {
  CardWithStats: React.ReactNode;
  TabComponent: React.ReactNode;
};

const DetailComponent: React.FC<detailTemplate> = (props) => {
  const classes = useStyles();
  const { CardWithStats, TabComponent } = props;

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="row"
      className={classes.container}
      style={{ padding: "1%", paddingRight: "0%" }}
    >
      <Grid container xs={12} direction="column" spacing={6}>
        <Grid item style={{ padding: "20px" }}>
          {CardWithStats}
          <Box>{TabComponent}</Box>
          <Box height="50px" width="100%" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailComponent;
