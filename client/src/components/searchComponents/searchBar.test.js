import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from "./searchBar";

//Search bar
describe("Searchbar", function () {
  it("should read in multiple categories", async function () {
    render(<SearchBar />);

    expect(await screen.findByText("Food")).toBeInTheDocument();
    expect(await screen.findAllByText("All")).toHaveLength(2);
    expect(await screen.findByText("Office Supplies")).toBeInTheDocument();
    expect(await screen.findByText("Test")).toBeInTheDocument();
  });
});
