import { Color } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import GraphikMedium from "../assets/fonts/GraphikMedium.otf";
import GraphikRegular from "../assets/fonts/GraphikRegular.otf";
import GraphikSemiBold from "../assets/fonts/GraphikSemibold.otf";

type ColorPartial = Partial<Color>;

declare module "@material-ui/core/styles/createPalette" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteColor extends ColorPartial {}
}

declare module "@material-ui/core/styles/createTypography" {
  interface Typography {
    inhherit: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  interface TypographyOptions {
    inherit?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    caption2: true;
  }
}

const fontFaceGraphikRegular = {
  fontFamily: "GraphikRegular",
  src: `url(${GraphikRegular}) format("opentype")`,
};

const fontFaceGraphikSemiBold = {
  fontFamily: "GraphikSemiBold",
  src: `url(${GraphikSemiBold}) format("opentype")`,
};

const fontFaceGraphikMedium = {
  fontFamily: "GraphikMedium",
  src: `url(${GraphikMedium}) format("opentype")`,
};

const theme = createTheme({
  spacing: [0, 4, 8, 12, 16, 20, 24, 32],
  palette: {
    primary: {
      main: "#0052FF",
      "100": "#FAFCFF",
      "300": "#CCE3FF",
      "500": "#0052FF",
      "700": "#002EB7",
      "900": "#00177A",
    },
    success: {
      main: "#20B03F",
      "500": "#20B03F",
      "100": "#E9F7EC",
    },
    warning: {
      main: "#FFA74F",
      "500": "#FFA74F",
      "100": "#FFF6ED",
    },
    error: {
      main: "#B71A33",
      "500": "#B71A33",
      "100": "#F3E6EB",
    },
    grey: {
      "50": "#F2F2F7",
      "100": "#E8E8F7",
      "300": "#B4B4CF",
      "500": "#4B4B60",
      "700": "#252545",
      "900": "#0E0E2E",
    },
    text: {
      primary: "#343446",
      secondary: "#7D7D89",
      hint: "#7D7D89",
      disabled: "#B2B2B9",
    },
    secondary: {
      main: "#FFA74F",
      contrastText: "#FFFFFF",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          fontFaceGraphikRegular,
          fontFaceGraphikSemiBold,
          fontFaceGraphikMedium,
        ],
      },
    },
  },
  typography: {
    overline: {
      gammaOverlineFontFamily: "Comic Sans Ms ",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "14px",
      identicalToBoxHeightOr117LetterSpacing: "0.005em",
      betaTextHighEmphasisColor: "#343446",
    },
    h4: {
      fontFamily: "GraphikMedium",
      fontSize: "40px",
      fontWeight: 500,
      letterSpacing: "-1%",
      lineHeight: "54px",
    },
    h6: {
      fontFamily: "GraphikRegular",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "34px",
    },
    caption: {
      fontFamily: "GraphikMedium",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0.01em",
    },
    inherit: {
      fontFamily: "GraphikRegular",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0.01em",
    },
    button: {
      fontFamily: "GraphikSemiBold",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "42px",
      letterSpacing: "0.01em",
    },
    body2: {
      fontFamily: "GraphikRegular",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "22px",
      letterSpacing: "0.01em",
    },
    subtitle2: {
      fontFamily: "GraphikRegular",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "0.005em",
    },
    subtitle1: {
      fontFamily: "GraphikSemiBold",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "0.005em",
    },
    body1: {
      fontFamily: "GraphikSemiBold",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "22px",
      letterSpacing: "0.01em",
    },
    caption2: {
      fontFamily: "GraphikRegular",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0.01em",
    },
  },
});

export default theme;
