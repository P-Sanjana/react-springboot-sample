import { Box, makeStyles, Typography, styled } from "@material-ui/core";
import React from "react";
import localeUtils from "../../../utils/locale-utils";

export type PortfolioCardProps = {
  icon: string;
  currencyType: string;
  currencyCode: string;
  currencyValue: number | undefined;
  currencyIcon?: string;
  gains?: number;
  color?: string;
};

const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  icon,
  currencyType,
  currencyCode,
  currencyValue,
  currencyIcon,
  gains,
  color,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "white",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
      height: "60px",
    },
    currencyIcon: {
      width: "42px",
      height: "42px",
      borderRadius: "100px",
      margin: theme.spacing(0, 2),
    },
    currencyCode: {
      color: theme.palette.text.secondary,
    },
    gainsText: {
      ...theme.typography.caption2,
      color,
    },
  }));
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.root}
    >
      <img src={icon} className={classes.currencyIcon} />
      <Box>
        <Typography variant="body1">{currencyType}</Typography>
        <Caption2Typography variant="caption" className={classes.currencyCode}>
          {currencyCode}
        </Caption2Typography>
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Typography variant="body1" data-testid="coin">
          {currencyValue && localeUtils.formatCurr(currencyValue)}
        </Typography>
        {gains ? (
          <Caption2Typography
            data-testid="gains"
            variant="caption"
            className={classes.gainsText}
          >
            {gains}%
          </Caption2Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default PortfolioCard;
