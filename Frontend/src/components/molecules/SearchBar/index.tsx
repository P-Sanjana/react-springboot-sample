import { Box, IconButton, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2, 3),
    height: "40px",
    border: `1px solid ${theme.palette.grey[100]}`,
    boxSizing: "border-box",
    borderRadius: theme.spacing(1),
  },
  searchIcon: {
    color: theme.palette.grey[500],
  },
}));

export type SearchProps = {
  variant?: "filled" | "standard" | "outlined";
  label?: string;
};

const SearchComponent: React.FC<SearchProps> = ({ label, variant }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.textField}
    >
      <Box flexGrow={1}>
        <InputBase
          placeholder={label}
          style={{
            fontFamily: "GraphikRegular",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "22px",
            letterSpacing: "0.01em",
          }}
        />
      </Box>
      <IconButton type="submit" aria-label="search">
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
    </Box>
  );
};

export default SearchComponent;
