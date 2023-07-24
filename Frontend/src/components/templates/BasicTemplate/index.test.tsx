import { Box } from "@mui/system";
import { render, screen } from "@testing-library/react";
import React from "react";
import BasicTemplate, { BasicTemplateProps } from ".";

describe("BasicTemplate", () => {
  const templateProps: BasicTemplateProps = {
    sideNav: <Box data-testid="sidenav" height="100%" width="100%" />,
    header: <Box data-testid="header" height="100%" width="100%" />,
    body: <Box data-testid="body" height="100%" width="100%" />,
    footer: <Box data-testid="footer" height="100px" width="100%" />,
  };
  it("should render input components", () => {
    const wrapper = render(<BasicTemplate {...templateProps} />);
    const container = wrapper.getByTestId("container");
    expect(container).toContainElement(screen.getByTestId("sidenav"));
    expect(container).toContainElement(screen.getByTestId("header"));
    expect(container).toContainElement(screen.getByTestId("body"));
    expect(container).toContainElement(screen.getByTestId("footer"));
  });
});
