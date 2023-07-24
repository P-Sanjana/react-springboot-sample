import { Box, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import DashboardLogo from "../../../assets/icons/dashboard-3-line.svg";
import Exit from "../../../assets/icons/exit.png";
import Site from "../../../assets/icons/minnet logo.svg";
import Notification from "../../../assets/icons/notification-3-line.svg";
import Pie from "../../../assets/icons/pie-chart-line.svg";
import StockLine from "../../../assets/icons/stock-line.svg";
import theme from "../../../theme/theme";
import IconComponent from "../../atoms/Icon/IconComponent";
import { DASHBOARD, TRADE } from "../../../utils/routes";
import { Link as RouterLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const styles = makeStyles(() => ({
  root: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    width: "80px",
    height: "100vh",
  },
  icon: {
    marginTop: theme.spacing(3),
    color: theme.palette.grey[500],
  },
}));

const SideNavBar: React.FC = () => {
  const style = styles();
  return (
    <>
      <Card variant="outlined" className={style.root}>
        <RouterLink to={DASHBOARD}>
          <Tooltip placement="right" title="Dashboard" arrow>
            <Box style={{ padding: 24 }}>
              <IconComponent icon={Site} />
            </Box>
          </Tooltip>
        </RouterLink>
        <RouterLink to={TRADE}>
          <Tooltip placement="right" title="Trade" arrow>
            <Box style={{ padding: 24 }}>
              <IconComponent icon={DashboardLogo} />
            </Box>
          </Tooltip>
        </RouterLink>

        <Box style={{ padding: 24 }}>
          <IconComponent icon={Pie} />
        </Box>
        <Box style={{ padding: 24 }}>
          <IconComponent icon={StockLine} />
        </Box>
        <Box style={{ padding: 24 }}>
          <IconComponent icon={Notification} />
        </Box>
        <Box style={{ padding: 24 }}>
          <IconComponent icon={Exit} />
        </Box>
      </Card>
    </>
  );
};
export default SideNavBar;
