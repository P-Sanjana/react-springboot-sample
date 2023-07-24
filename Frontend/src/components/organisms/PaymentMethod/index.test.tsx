import React from "react";
import ReactDOM from "react-dom";
import PaymentMethod from ".";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <PaymentMethod usdOrTotal="t" cardTitle="Total Balance" />,
    div,
  );
});
