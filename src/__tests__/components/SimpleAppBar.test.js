import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SimpleAppBar from "../../component/SimpleAppBar";

afterAll(cleanup);

describe("Simple App Bar Component", () => {
  test("General rendering test", async () => {
    render(<SimpleAppBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
