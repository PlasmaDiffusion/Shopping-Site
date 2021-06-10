//General components get tested here. See other test files in the component folders.
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Loading from "./components/loading";

//Loading component
describe("Loading component", function () {
  it("renders a basic loading <p> message, and should not render a heading unless logged in", function () {
    render(<Loading />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.queryByRole("heading")).toBeNull();
  });
});
