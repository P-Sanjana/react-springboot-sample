import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";
import ChevronLeftSVG from "../../../assets/icons/chevron-left.svg";
import ChevronRightSVG from "../../../assets/icons/chevron-right.svg";
import { Currency } from "../../../types/currency.type";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  scrollableContainer: {
    flexGrow: 1,
    overflowX: "hidden",
    "-ms-overflow-style": "scroll",
    scrollbarWidth: "none",
  },
  stripContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: theme.spacing(4),
  },
  chipBoxBase: {
    flexGrow: 0,
    flexShrink: 0,
  },
  chipBox: {
    borderRadius: theme.spacing(1),
    boxSizing: "border-box",
    cursor: "pointer",
    width: "166px",
    padding: theme.spacing(2, 4),
  },
  chipBoxSelected: {
    border: "2px solid",
  },
}));

export type CurrencyChipData = {
  selected?: boolean;
} & Pick<Currency, "color" | "name">;

export interface CurrencyChipStripProps {
  data: Array<CurrencyChipData>;
  onClick: (index: number) => void;
}

const CurrencyChipStrip: React.FC<CurrencyChipStripProps> = ({
  data,
  onClick: onSelect,
}) => {
  const classes = useStyles();
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [scrollStep, scrollDistance, scrollSpeed] = [10, 150, 25];

  const scrollClick = (direction: "left" | "right") => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (scrollElementRef.current) {
        if (direction == "left") {
          scrollElementRef.current.scrollLeft -= scrollStep;
        } else {
          scrollElementRef.current.scrollLeft += scrollStep;
        }
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollDistance) {
          window.clearInterval(slideTimer);
        }
      }
    }, scrollSpeed);
  };

  return (
    <Box className={classes.root}>
      <Box data-testid="scroll-left-button">
        <IconButton color="primary" onClick={() => scrollClick("left")}>
          <img src={ChevronLeftSVG} alt="" />
        </IconButton>
      </Box>
      <Box
        className={classes.scrollableContainer}
        {...{ ref: scrollElementRef }}
      >
        <Box className={classes.stripContainer}>
          {data.map((item, index) => {
            let className = `${classes.chipBox}`;
            if (item.selected) {
              className = `${className} ${classes.chipBoxSelected}`;
            }
            return (
              <ButtonBase key={index} className={classes.chipBoxBase}>
                <Box
                  className={className}
                  style={{
                    backgroundColor: alpha(item.color, 0.2),
                    borderColor: item.selected ? item.color : undefined,
                  }}
                  onClick={() => onSelect(index)}
                  data-testid={index}
                >
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
      <Box data-testid="scroll-right-button">
        <IconButton color="primary" onClick={() => scrollClick("right")}>
          <img src={ChevronRightSVG} alt="" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CurrencyChipStrip;
