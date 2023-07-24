import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider, StylesProvider, CssBaseline } from "@material-ui/core";
import theme from "../src/theme/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((Story) => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </StylesProvider>
));
