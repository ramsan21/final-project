import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DepartmentSetupPage } from "../../pages/DepartmentSetupPage";

afterAll(cleanup);

describe("Department Setup Page Component", () => {
  test("General rendering tests", async () => {
    render(<DepartmentSetupPage />);
    expect(screen.getByText("Cogent")).toBeInTheDocument();
    expect(screen.getByText("DC Details:")).toBeInTheDocument();
    expect(screen.getByText("DC Name")).toBeInTheDocument();
    expect(screen.getByText("Domain Name")).toBeInTheDocument();
    expect(screen.getByText("Forest Name")).toBeInTheDocument();
    expect(screen.getByText("AD Site")).toBeInTheDocument();
    expect(screen.getByText("Repaved triggered by")).toBeInTheDocument();
    expect(screen.getByText("Repave triggered at")).toBeInTheDocument();
  });
});
