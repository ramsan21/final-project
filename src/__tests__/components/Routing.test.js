import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Routing } from "../../component/Routing";
import { MemoryRouter } from "react-router-dom";

afterAll(cleanup);

describe("Routing Component", () => {
  test("General Rendering Tests", async () => {
    render(
      <MemoryRouter>
        <Routing />
      </MemoryRouter>
    );
    expect(screen.getByText("DC REPAVE")).toBeInTheDocument();
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
    expect(screen.getByText("Copyright Details")).toBeInTheDocument();
  });
});
