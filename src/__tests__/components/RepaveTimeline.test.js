import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import GeneralDetails from "../../component/RepaveTimeline";

afterAll(cleanup);

describe("Repave Timeline Component", () => {
  test("General rendering tests", async () => {
    render(<GeneralDetails />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("End")).toBeInTheDocument();
  });
});
