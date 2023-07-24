import { Box, styled, Typography } from "@material-ui/core";
import React from "react";
import ArrowRightDownIcon from "../../../assets/icons/arrow-right-down-line.svg";
import ArrowRightUpIcon from "../../../assets/icons/arrow-right-up-line.svg";

const ChangeRateView: React.FC<{ changeRate: number }> = ({ changeRate }) => {
  const positive = changeRate >= 0;
  const sign = changeRate > 0 ? "+" : "";

  const ChangeRateTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.caption2,
    color: positive ? theme.palette.success.main : theme.palette.error.main,
  }));

  return (
    <Box display="flex" alignItems="center">
      <img
        src={positive ? ArrowRightUpIcon : ArrowRightDownIcon}
        data-testid="crv-icon"
      />
      <ChangeRateTypography variant="caption" data-testid="crv-text">
        {sign}
        {changeRate}%
      </ChangeRateTypography>
    </Box>
  );
};

export default ChangeRateView;
