import { render } from "@testing-library/react";
import React from "react";
import theme from "../../../theme/theme";
import WatchlistItemChart from "./index";

describe("WatchlistItem Component", () => {
  it("should render without crash", () => {
    render(
      <WatchlistItemChart
        data={[
          {
            datetime: new Date("2021-10-12T06:10:11.397Z"),
            value: 171,
          },
          {
            datetime: new Date("2021-10-12T07:10:11.397Z"),
            value: 416,
          },
        ]}
        color={theme.palette.primary[100]}
      />
    );
  });
});
