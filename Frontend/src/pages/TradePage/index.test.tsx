import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import TradePage from ".";
import * as services from "../../services/services";

const currencies = [
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
  {
    id: 2,
    name: "Ethereum",
    code: "ETH",
    color: "#627EEA",
    logoUrl:
      "https://s3-alpha-sig.figma.com/img/4d98/98f1/34ba65c8fe125aa34b85606d353a3805?Expires=1635724800&Signature=ZWi-M7ieJvw3jb5Bic8cl~Tivmi788PA5g-QFuQhzICw7kqszueKUPZj3AFh2dtwhZzUTYEs-oZBIc-568JGFEGxdIordUPblNhcx8ri2wVcFI4r-o7Mc5ZS2Kt~2CLi3Bd5obzA8E2J4MRaS7btErSI6Ec2wL-vShO~80NW~CcpwqgAngDaXh7-A8Zchbvdy9BrOyZxhTd1QHw0bnEQdrHFdDo~zL1KZfJFcXp2Js7783UXxKAWE1SdkzAGrJyVAyoNkrpnH0xxFwk4qRkfx~dqP4uo58nzZFWxxzS7pofUvJ2RhpWQYP--l2yvt3vs9Ah-HmL~Xvc4BAjOsdSZeg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    watch: false,
    price: 4115.5,
    priceSymbol: "$",
    changeRate: 2.52,
    marketCapStr: "$482B",
    marketCap: 482855471885,
    vol24h: "$14B",
    circulatingSupply: "118M ETH",
  },
  {
    id: 3,
    name: "Tether",
    code: "USDT",
    color: "#191971",
    logoUrl:
      "https://s3-alpha-sig.figma.com/img/dbf9/7004/d398f553f70e80bb4ee7cd586c2ed10a?Expires=1635724800&Signature=EzmjV0bzPSYQeCJbsrMONROKqq9DzqVejmvT43XktPdhLFm815QpiArWNbWMFAyxtmiff8CPXxJSWzdjC5Ix2avMGr1Jmd4yQgVp~SHjaznkJYKS~4kUCVjzpwdmelUNvXzdveu19Tl2Z5wIucBajEY6BtKekc3ZTUyYRKN09uqP8V02xOFiA43bUhl3diGzrxA20TonLxdSJQXgYdJiMk1v44xdyHsdsYBF0ku5VNnZros~AgpRRBN9n4N6NDWH1TtZf3-zhNCDKEA3DLSSoRIahCpDyJYrvmra4eOywMQJGbCmAeWKHf1dxF8cklvWW62xbO6qZmBoZRbaTUFvtA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    watch: true,
    price: 1,
    priceSymbol: "$",
    changeRate: 0.06,
    marketCapStr: "$69B",
    marketCap: 69616232735,
    vol24h: "$55B",
    circulatingSupply: "69.57B USDT",
  },
];

describe("Trade Page", () => {
  it("Should render", async () => {
    const spyGetCurrencies = jest.spyOn(services, "getCurrencies");
    spyGetCurrencies.mockResolvedValue(currencies);

    const wrapper = render(
      <MemoryRouter>
        <TradePage userId={0} userFullname={""} userAvatarUrl={""} />
      </MemoryRouter>
    );
    const searchControl = wrapper.getByTestId("search-control");
    await waitFor(() => {
      expect(searchControl).toBeInTheDocument();
      expect(spyGetCurrencies).toHaveBeenCalled();
    });
  });
  it("Should toggle watch and sort", async () => {
    const spyGetCurrencies = jest.spyOn(services, "getCurrencies");
    spyGetCurrencies.mockResolvedValue(currencies);
    const spySetWatch = jest.spyOn(services, "setWatchItem");
    const wrapper = render(
      <MemoryRouter>
        <TradePage userId={0} userFullname={""} userAvatarUrl={""} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const watchToggle = wrapper.getAllByTestId("watch-toggle")[1];
      fireEvent.click(watchToggle);
      expect(spySetWatch).toHaveBeenCalled();
      const sortToggle = wrapper.getByTestId("sort-toggle");
      fireEvent.click(sortToggle);
      fireEvent.click(sortToggle);
      fireEvent.click(sortToggle);
    });
  });
  it("Should handle error toggle watch", async () => {
    const spyGetCurrencies = jest.spyOn(services, "getCurrencies");
    spyGetCurrencies.mockResolvedValue(currencies);
    const spySetWatch = jest.spyOn(services, "setWatchItem");
    spySetWatch.mockImplementation((userId, currId, watch) => {
      throw new Error();
    });
    const wrapper = render(
      <MemoryRouter>
        <TradePage userId={0} userFullname={""} userAvatarUrl={""} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const watchToggle = wrapper.getAllByTestId("watch-toggle")[1];
      fireEvent.click(watchToggle);
      expect(spySetWatch).toHaveBeenCalled();
    });
  });
});
