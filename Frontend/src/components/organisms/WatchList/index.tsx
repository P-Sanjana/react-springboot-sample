import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Edit from "../../../assets/icons/pencil-line.svg";
import GridLayout from "../../../assets/icons/layout-grid-fill-blue.svg";
import Menu from "../../../assets/icons/list-view-icon-black.svg";
import CardWithGraph from "../../molecules/CardWithGraph/index";
import RightArrow from "../../../assets/icons/arrow-right-s-line.svg";
import { watchlist, discoverAssets, edit } from "../../../utils/constants";
import theme from "../../../theme/theme";
import { ChartPoint } from "../../../types/chartdata.type";
import { Link } from "react-router-dom";
import { TRADE } from "../../../utils/routes";
import { watchlistChart } from "../../../pages/DashboardPage";

export type ListProps = {
  icon: string;
  currencyType: string;
  currencyValue: string;
  gains: string;
  color?: string;
  graphData: Array<ChartPoint>;
};
export type WatchListProps = {
  graphDataProp: Array<watchlistChart> | undefined;
};

const useStyles = makeStyles({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  verticalLine: {
    height: "22px",
    left: "102px",
    border: `1px solid ${theme.palette.grey[100]}`,
    margin: theme.spacing(3, 2, 2, 2),
  },
  row: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(5, 3),
  },
  rowContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContent2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  watchList: {
    height: "28px",
    color: theme.palette.text.primary,
    margin: theme.spacing(2, 3),
  },
  discoverAssets: {
    height: "16px",
    top: "7.5px",
    color: theme.palette.primary["500"],
    margin: theme.spacing(4, 0, 4, 3),
  },
  rightArrow: {
    width: "20px",
    height: "16px",
    top: "7.5px",
    margin: theme.spacing(4, 0),
  },
  edit: {
    height: "16px",
    top: "4px",
    color: theme.palette.primary["500"],
    margin: theme.spacing(5, 3),
  },
  editIcon: {
    marginRight: theme.spacing(4),
  },
  gridLayout: {
    margin: theme.spacing(3, 1),
    color: theme.palette.primary["500"],
  },
  menu: {
    margin: theme.spacing(3, 1),
    color: "black",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "300px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  flexItem: {
    width: "50%",
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  watchlistContainer: {
    display: "flex",
    overflow: "auto",
    height: "300px",
    backgroundColor: theme.palette.background.paper,
  },
  assetsLink: {
    textDecoration: "none",
    "&:visited": {
      textDecoration: "none",
      color: "inherit",
    },
  },
});

const WatchList: React.FC<WatchListProps> = ({ graphDataProp }) => {
  const classes = useStyles();

  const renderWatchLists = () => {
    return graphDataProp?.map((watchList, index) => {
      return (
        <Box
          key={index}
          className={classes.flexItem}
          style={{ backgroundColor: theme.palette.primary["100"] }}
        >
          <Link
            to={{ pathname: `/detail/${watchList.id}` }}
            className={classes.assetsLink}
          >
            <CardWithGraph
              icon={watchList.icon}
              currencyType={watchList.currencyType}
              currencyValue={watchList.currencyValue}
              gains={watchList.gains}
              graphData={watchList.graphData}
            />
          </Link>
        </Box>
      );
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box className={classes.rowContent}>
          <Typography variant="subtitle1" className={classes.watchList}>
            {watchlist}
          </Typography>
          <Box
            className={`${classes.verticalLine} ${classes.rowContent}`}
          ></Box>

          <Typography
            variant="caption"
            data-testid="assets"
            className={classes.discoverAssets}
          >
            <Link to={TRADE} className={classes.assetsLink}>
              {discoverAssets}
            </Link>
          </Typography>

          <img src={RightArrow} className={classes.rightArrow} />
        </Box>
        <Box className={classes.rowContent2}>
          <Typography variant="caption" className={classes.edit}>
            {edit}
          </Typography>
          <img src={Edit} className={classes.editIcon} />
          <Box
            className={`${classes.verticalLine} ${classes.rowContent}`}
          ></Box>
          <img
            src={GridLayout}
            data-testid="grid"
            className={classes.gridLayout}
          />
          <img src={Menu} className={classes.menu} />
        </Box>
      </Box>
      <Box justifyContent="space-between" className={classes.container}>
        {renderWatchLists()}
      </Box>
    </Box>
  );
};

export default WatchList;
