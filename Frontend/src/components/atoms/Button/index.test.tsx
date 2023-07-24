import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button Component", () => {
  it("should match snapshot", () => {
    const test1 = jest.fn();

    const wrapper = render(
      <Button variant="contained" color="primary" onClick={test1}>
        Buy
      </Button>,
    );
    expect(wrapper).toBeTruthy;

    const hello = screen.getByRole("button");
    fireEvent.click(hello);

    expect(test1).toBeCalled();
  });
});
