import { Typography, styled } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import React from "react";

export type TextProps = {
  children: string;
  variant: Variant | undefined;
};

const Caption2Typography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
}));

export const CaptionText: React.FC<TextProps> = ({ children, variant }) => {
  return <Caption2Typography variant={variant}>{children}</Caption2Typography>;
};

const Text: React.FC<TextProps> = ({ children, variant }) => {
  return <Typography variant={variant}>{children}</Typography>;
};

export default Text;
