import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

//Api mocks
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, act } from "@testing-library/react";

//Mock request tests
const server = setupServer(
  rest.get("/read/categories/", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 0, name: "All" },
        { id: 1, name: "Food" },
        { id: 2, name: "Office Supplies" },
        { id: 3, name: "Test" },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
