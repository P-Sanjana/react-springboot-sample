import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import BasePageProps from "./pages/base-page-props.type";
import BuySell, { BuySellProps } from "./pages/BuySell/index";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/detail";
import TradePage from "./pages/TradePage";
import WalletPage from "./pages/wallet";
import theme from "./theme/theme";
import { userProfile } from "./utils/mockData";
import * as routes from "./utils/routes";

const BuySellPageWrapper = (props: BuySellProps) => {
  const location = useLocation();

  return <BuySell {...props} key={location.key} />;
};

const App: React.FC = (props) => {
  // const location = useLocation();
  const basePageProps: BasePageProps = userProfile;
  // const { data }: any = location.state;
  // console.log("Location" + data);
  // console.log("Location:" + location);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path={routes.TRADE} exact>
            <TradePage {...basePageProps} />
          </Route>
          <Route path={routes.SELL}>
            <BuySellPageWrapper buy={false} />
          </Route>
          <Route path={routes.PURCHASE}>
            <BuySellPageWrapper buy={true} />
          </Route>
          <Route path={routes.DASHBOARD} exact>
            <DashboardPage />
          </Route>
          <Route path={routes.WALLET} exact>
            <WalletPage />
          </Route>
          <Route path={routes.DETAIL} exact>
            <DetailPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
