import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MiniDrawerContainer from "../../container/MiniDrawerContainer";

afterAll(cleanup);

describe("Mini Drawer Container Component", () => {
  test("General rendering tests", async () => {
    const opensidebar = false;
    const handlesidebar = jest.fn();
    render(
      <MemoryRouter>
        <MiniDrawerContainer
          opensidebar={opensidebar}
          sidebarclick={handlesidebar}
        />
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
    userEvent.click(document.querySelector(".MuiDrawer-paper button"));
    expect(handlesidebar).toHaveBeenCalled();
  });
});
