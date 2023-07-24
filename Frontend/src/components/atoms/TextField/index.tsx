import { TextField } from "@material-ui/core";
import React from "react";

interface TextFieldProps {
  variant?: "standard" | "filled" | "outlined";
  label?: string;
  id?: string;
  InputProps?: any;
  className?: any;
}

const MyTextField: React.FC<TextFieldProps> = ({
  variant,
  label,
  id,
  InputProps,
  className,
}) => {
  return (
    <TextField
      className={className}
      label={label}
      variant={variant}
      inputProps={{
        maxLength: 20,
      }}
      InputProps={InputProps}
      id={id}
    />
  );
};

export default MyTextField;
