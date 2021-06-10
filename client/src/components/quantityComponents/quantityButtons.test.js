import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QuantityButtons from "./quantityButtons";

//Quantity buttons
describe("Quanity button component", function () {
  it("should have two buttons and show a quantity of 1, then a quantity of 2", async function () {
    render(<QuantityButtons amount={1} max={3} onAmountChanged={() => {}} />);

    expect(screen.getAllByRole("button")).toHaveLength(2);

    expect(screen.getByText("1")).toBeInTheDocument();

    userEvent.click(screen.getByText("+"));

    expect(await screen.findByText("2")).toBeInTheDocument();
  });
});
