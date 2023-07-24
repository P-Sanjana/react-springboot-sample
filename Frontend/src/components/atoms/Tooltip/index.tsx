import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export type TooltipProps = {
  title: string;
  children: JSX.Element;
  arrow: boolean;
  placement:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
};

const TooltipComponent: React.FC<TooltipProps> = ({
  title,
  children,
  arrow,
  placement,
}) => {
  return (
    <Tooltip title={title} placement={placement} arrow={arrow}>
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
