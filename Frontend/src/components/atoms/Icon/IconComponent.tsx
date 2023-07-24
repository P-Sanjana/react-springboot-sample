import React from "react";
import { IconButton } from "@material-ui/core";

export interface IconProps {
  icon: string;
  onClick?: React.ReactEventHandler;
  className?: any;
}

const IconComponent: React.FC<IconProps> = ({
  icon,
  onClick,
  className,
}: IconProps) => {
  return (
    <IconButton color="secondary" onClick={onClick}>
      <img src={icon} alt="" className={className} />
    </IconButton>
  );
};

export default IconComponent;
