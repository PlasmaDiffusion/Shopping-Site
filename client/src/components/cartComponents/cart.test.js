import React from "react";
import { render, screen, act } from "@testing-library/react";

import Cart from "./cart";

//Cart
describe("Cart component", function () {
  it("should have at least two items", async function () {
    render(<Cart test={true} />);

    expect(screen.getAllByRole("heading")).toHaveLength(2);
  });
});
