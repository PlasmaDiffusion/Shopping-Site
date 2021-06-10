import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./productCard";

//Product
describe("Product Page component", function () {
  it("renders 3 items", async function () {
    const products = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Orange" },
      { id: 3, name: "Banana" },
    ];

    render(<ProductCard product={products[0]} />);
    render(<ProductCard product={products[1]} />);
    render(<ProductCard product={products[2]} />);

    expect(screen.getAllByRole("heading")).toHaveLength(3);
  });
});
