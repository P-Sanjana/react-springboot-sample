import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    backgroundColor: "#FAFCFF",
  },
  sideNav: {
    width: "80px",
    top: 0,
    left: 0,
  },
  contentContainer: {
    marginLeft: "80px",
    minHeight: "100vh",
  },
  header: {
    height: "82px",
    width: "100%",
  },
});

export interface BasicTemplateProps {
  sideNav: React.ReactNode;
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  bgColor?: string;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({
  sideNav,
  header,
  body,
  footer,
  bgColor,
}) => {
  const classes = useStyles();
  return (
    <Box data-testid="container" className={classes.container}>
      <Box className={classes.sideNav}>{sideNav}</Box>
      <Box
        display="flex"
        flexDirection="column"
        className={classes.contentContainer}
      >
        <Box className={classes.header}>{header}</Box>
        <Box flexGrow={1} style={{ backgroundColor: bgColor }}>
          {body}
        </Box>
        {footer}
      </Box>
    </Box>
  );
};

export default BasicTemplate;
