import { Box, Grid, makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../../theme/theme";

const useStyles = makeStyles(() => ({
  defaultTab: {
    height: "28px",
    left: theme.spacing(4),
    fontFamily: "GraphikRegular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "0.005em",
    identicalToBoxHeightOr140Display: "flex",
    alignItems: "center",
    textTransform: "none",
  },
  activeTab: {
    height: "28px",
    left: theme.spacing(4),
    textTransform: "none",
    fontFamily: "GraphikRegular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "0.005em",
    identicalToBoxHeightOr140Display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
}));
export type TabProps = {
  CurrencyOverview: JSX.Element;
  AboutCrypto: JSX.Element;
  TotalBalance: JSX.Element;
  SearchComponent: JSX.Element;
  DropDown: JSX.Element;
  TransactionList: JSX.Element;
};
type tabPanel = {
  children: any;
  value: any;
  index: any;
};
const tabComponent: React.FC<TabProps> = (props) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const {
    CurrencyOverview,
    AboutCrypto,
    TotalBalance,
    SearchComponent,
    DropDown,
    TransactionList,
  } = props;

  const handleTab = (e: any, val: any) => {
    setTabValue(val);
  };
  function getStyle(isActive: boolean) {
    return isActive ? classes.activeTab : classes.defaultTab;
  }
  function TabPanel(args: tabPanel) {
    const { children, value, index } = args;
    return <>{value === index && <h1>{children}</h1>}</>;
  }

  return (
    <>
      <Box style={{ borderBottom: "1px solid #E8E8F7" }}>
        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: "blue",
            },
          }}
          value={tabValue}
          onChange={handleTab}
        >
          <Tab label="Overview" className={getStyle(tabValue === 0)} />
          <Tab label="Wallet" className={getStyle(tabValue === 1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {CurrencyOverview}

        <Grid item xs={9} style={{ paddingTop: "2%" }}>
          {AboutCrypto}
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {TotalBalance}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Box
            gridColumnGap={theme.spacing(3)}
            style={{
              paddingTop: "2%",
              paddingBottom: "1%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {SearchComponent}
            {DropDown}
          </Box>
        </Grid>
        <Box style={{ border: "1px solid #E8E8F7" }}>{TransactionList}</Box>
      </TabPanel>
    </>
  );
};

export default tabComponent;
