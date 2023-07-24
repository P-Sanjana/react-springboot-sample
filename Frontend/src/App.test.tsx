import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { PURCHASE } from "./utils/routes";

test("renders learn react link", async () => {
  const wrapper = render(<App />);

  await waitFor(() => {
    const buyBtn = wrapper.getByTestId("buyBtn");
    fireEvent.click(buyBtn);
    expect(location.pathname).toBe(PURCHASE);
  });
});
