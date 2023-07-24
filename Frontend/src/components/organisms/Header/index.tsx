import {
  AppBar,
  Avatar,
  Box,
  Divider,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import * as constants from "../../../utils/constants";
import IconComponent from "../../atoms/Icon/IconComponent";
import ChevronDownIcon from "../../../assets/icons/chevron-down.svg";
import { Link as RouterLink } from "react-router-dom";
import * as routes from "../../../utils/routes";
import Button from "../../atoms/Button/index";

const useStyles = makeStyles((theme) => ({
  appbar: {
    padding: theme.spacing(0),
    boxShadow: "none",
    borderBottom: `2px solid ${theme.palette.grey[100]}`,
  },
  headerContainer: {
    width: "100%",
    padding: theme.spacing(5, 6),
  },
  headerButtonLink: {
    textDecoration: "none",
  },
  headerButton: {
    padding: theme.spacing(0, 4, 0, 4),
    width: "120px",
  },
  buttonNAvatarDivider: {
    margin: theme.spacing(1, 5),
    alignSelf: "stretch",
  },
  avatarPic: {
    width: "32px",
    height: "32px",
  },
}));

export interface HeaderProps {
  title: string;
  avatarPicUrl: string;
  avatarPicAlt: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  avatarPicUrl,
  avatarPicAlt,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <AppBar position="relative" color="inherit" className={classes.appbar}>
      <Toolbar>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.headerContainer}
        >
          <Box flexGrow={1}>
            <Typography variant="h6" data-testid="title">
              {title}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridColumnGap={theme.spacing(3)}
          >
            <RouterLink
              to={routes.SELL}
              className={classes.headerButtonLink}
              data-testid="sellBtn"
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.headerButton}
                disableElevation
                data-testid="button-sell"
              >
                {constants.buttonTextSell}
              </Button>
            </RouterLink>
            <RouterLink
              to={routes.PURCHASE}
              className={classes.headerButtonLink}
              data-testid="buyBtn"
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.headerButton}
                disableElevation
                data-testid="button-buy"
              >
                {constants.buttonTextBuy}
              </Button>
            </RouterLink>
          </Box>
          <Box className={classes.buttonNAvatarDivider}>
            <Divider orientation="vertical" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridColumnGap={theme.spacing(2)}
          >
            <Avatar
              src={avatarPicUrl}
              alt={avatarPicAlt}
              className={classes.avatarPic}
            />
            <IconComponent icon={ChevronDownIcon} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
