import React, { ReactNode } from "react";
import Button from "@material-ui/core/Button";

interface ButtonProps {
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  children: string | ReactNode;
  onClick?: any;
  startIcon?: ReactNode;
  className?: any;
  disabled?: boolean;
  disableElevation?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  variant,
  color,
  children,
  onClick,
  className,
  disabled,
  disableElevation,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      className={className}
      disabled={disabled}
      disableElevation={disableElevation}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
