import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Breadcrumb from "../../component/Breadcrumb";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterAll(cleanup);

describe("Bread Crumb Component", () => {
  test("Cogent Health is in the header", async () => {
    render(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
