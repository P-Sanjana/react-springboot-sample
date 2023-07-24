import { ThemeProvider } from "@material-ui/core";
import { render } from "@testing-library/react";
import React from "react";
import theme from "../../../theme/theme";
import Table, { TableProps } from "./index";

describe("Table Component", () => {
  const commonTableProps: TableProps = {
    setWatch: (di) => console.log(`Set watch ${di}`),
    data: [
      {
        id: 1,
        name: "Bitcoin",
        code: "BTC",
        color: "#F7931A",
        logoUrl:
          "https://s3-alpha-sig.figma.com/img/3081/886d/bb95f08981a385cf742cbde18bac74e1?Expires=1635724800&Signature=HW8nL9s0E8pc8bHC5FFlxSzUHlSavGAzYHsKxFS7KpTsVaMQ~V4HjAoKP5HggTq18zXZkiKCtt9wCxDJ9J0BvHPjp90jagsn8n3j5rQTsqtuAblTpbNaPEBcJ5h-fr5zhJ2eFe1H64iOF7DdwMaaEeMCTcgJUOJhHzVVg2YkbEsybC0j~WhqfHX9d-H4TojDJYKt-lF4ztnQ17ZBEBOJem-h1y6B3fSY2K2B83YVGWgwqHKdww7RqUVQrKljDxJ7nGJnpUiWmn7R8mjqULxr7160-YGDJV-cGlOed7nMSAM1F9ARfZWOWweT0T6aP3FOc3E3zjqh9ycAP6mCiqUUMg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        watch: true,
        price: 61048.7,
        priceSymbol: "$",
        changeRate: 1.06,
        marketCapStr: "$1.15T",
        marketCap: 1149846087372,
        vol24h: "$24.7B",
        circulatingSupply: "18M BTC",
      },
    ],
  };
  it("should have semantic2 color when change is positive", () => {
    const tableProps = { ...commonTableProps };
    tableProps.data[0].changeRate = 2.9;
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Table {...tableProps} />
        );
      </ThemeProvider>,
    );
    const comp = wrapper.getByTestId("change");
    expect(comp).toHaveStyle({ color: theme.palette.success.main });
  });
  it("should have semantic6 color when change is negative", () => {
    const tableProps = { ...commonTableProps };
    tableProps.data[0].changeRate = -2.9;
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Table {...tableProps} />
        );
      </ThemeProvider>,
    );
    const comp = wrapper.getByTestId("change");
    expect(comp).toHaveStyle({ color: theme.palette.error.main });
  });
  it("should match snapshot", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Table {...commonTableProps} />
        );
      </ThemeProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
