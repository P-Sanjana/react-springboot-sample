import { ButtonBase, makeStyles, Typography, styled } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import React from "react";
import theme from "../../../theme/theme";

export type TimePeriodChangeEventHandler = (timePeriod: string) => void;

export type TimePeriodTabProps = {
  timePeriods: Array<string>;
  selectedTimePeriod: string;
  onClick?: TimePeriodChangeEventHandler;
};

const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

const useStyles = makeStyles({
  card: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardItem: {
    margin: theme.spacing(0, 2),
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.hint,
    borderBottom: `3px solid ${theme.palette.background.paper}`,
  },
  active: {
    width: "fit-content",
    color: theme.palette.primary["500"],
    borderBottom: `3px solid ${theme.palette.primary["500"]}`,
  },
});

const TimePeriodTab: React.FC<TimePeriodTabProps> = ({
  timePeriods,
  selectedTimePeriod,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <Box className={classes.cardContent}>
        {timePeriods.map((timePeriod, index) => (
          <ButtonBase
            key={index}
            onClick={() => {
              if (onClick) {
                onClick(timePeriod);
              }
            }}
          >
            <Caption2Typography
              variant="caption"
              data-testid={timePeriod}
              className={`${
                selectedTimePeriod === timePeriod ? classes.active : ""
              } ${classes.cardItem}`}
            >
              {timePeriod}
            </Caption2Typography>
          </ButtonBase>
        ))}
      </Box>
    </Card>
  );
};

export default TimePeriodTab;
