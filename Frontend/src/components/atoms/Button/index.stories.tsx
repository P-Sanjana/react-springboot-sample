import React from "react";
import Button from ".";

export default {
  title: "atoms/button",
  component: Button,
};

export const Buy = (): JSX.Element => (
  <Button variant="contained" color="primary">
    Buy
  </Button>
);

export const Sell = (): JSX.Element => (
  <Button variant="contained" color="secondary">
    Sell
  </Button>
);
