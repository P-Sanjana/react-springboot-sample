import React from "react";
import { render } from "@testing-library/react";
import AmountDetails from "./index";
import { selectedCrypto, balance } from "../../../utils/constants";

describe("Checkout Component", () => {
  it("should match snapshot", () => {
    const wrapper = render(
      <AmountDetails
        amountEventHandler={() => console.log("amount handler")}
        amountEntered={876400}
        selectedCrypto={selectedCrypto}
        convertedCoin={0.0346}
        convertedCoinHandler={() => console.log("converted")}
        buttonTitle="Buy Max"
        totalBal={balance}
        error=""
        setErrorHandler={() => console.log("error message")}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
