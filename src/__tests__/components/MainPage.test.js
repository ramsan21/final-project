import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import MainPage from "../../component/MainPage";

afterAll(cleanup);

describe("Main Page Component", () => {
  test("General rendering tests", async () => {
    const opensidebar = false;
    const handlesidebar = jest.fn();
    render(
      <MemoryRouter>
        <MainPage opensidebar={opensidebar} toggleHandler={handlesidebar} />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Creative Tim" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "General Setup" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Device Setup" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inventory Setup" })
    ).toBeInTheDocument();
  });
});
