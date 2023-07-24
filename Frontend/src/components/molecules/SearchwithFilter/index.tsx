import {
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import FilterIcon from "../../../assets/icons/filter.svg";
import theme from "../../../theme/theme";
const useStyles = makeStyles(() => ({
  divider: {
    width: "2px",
    height: "28px",
    marginRight: theme.spacing(1),
    gborder: `1px solid ${theme.palette.grey[100]}`,
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    height: "40px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    border: `2px solid ${theme.palette.grey[100]}`,
    boxShadow: "none",
  },
}));
export interface SearchFilterProps {
  placeholder: string;
}
const SearchFilter: React.FC<SearchFilterProps> = (props) => {
  const { placeholder } = props;
  const classes = useStyles();
  return (
    <>
      <Paper component="form" className={classes.paper}>
        <InputBase
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "GraphikRegular",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "22px",
            letterSpacing: "0.01em",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search " }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ color: "#4B4B60" }} />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <img src={FilterIcon} color="#4B4B60" />
      </Paper>
    </>
  );
};

export default SearchFilter;
