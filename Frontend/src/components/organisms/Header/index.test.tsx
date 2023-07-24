import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Header from ".";
import BitcoinPNG from "../../../assets/coinImage/bitcoin.png";

describe("Header organism component", () => {
  it("should render with given title and callbacks", () => {
    const wrapper = render(
      <MemoryRouter>
        <Header
          title={"Trade"}
          avatarPicUrl={BitcoinPNG}
          avatarPicAlt="Test User"
        />
      </MemoryRouter>
    );
    expect(wrapper.getByTestId("title")).toHaveTextContent("Trade");
  });
});
