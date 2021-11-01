import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import MainPageContainer from "../../container/MainPageContainer";

afterAll(cleanup);

describe("Mini Drawer Container Component", () => {
  test("General rendering tests", async () => {
    render(
      <MemoryRouter>
        <MainPageContainer />
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
    userEvent.click(screen.getByRole("button", { name: "Open drawer" }));
  });
});
