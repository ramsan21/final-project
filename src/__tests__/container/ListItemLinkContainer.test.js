import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ListItemLinkContainer from "../../container/ListItemLinkContainer";
import { MemoryRouter } from "react-router-dom";

afterAll(cleanup);

describe("ListItem Link Container Component", () => {
  test("Testing a menu with a submenu length of zero", async () => {
    const menuObj = {
      id: "01",
      path: "/home",
      menuName: "Home",
      icon: <svg role="menu-icon" />,
      submenu: [],
    };
    render(
      <MemoryRouter>
        <ListItemLinkContainer menuobj={menuObj} location={"/home"} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("menu-icon")).toHaveLength(1);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  test("Testing a menu with a submenu length of two", async () => {
    const menuObj = {
      id: "01",
      path: "/home",
      menuName: "Home",
      icon: <svg role="menu-icon" />,
      submenu: [
        {
          id: "02",
          path: "/contact",
          menuName: "Contact",
          icon: <svg role="menu-icon" />,
        },
        {
          id: "03",
          path: "/about",
          menuName: "About",
          icon: <svg role="menu-icon" />,
        },
      ],
    };
    render(
      <MemoryRouter>
        <ListItemLinkContainer menuobj={menuObj} location={"/home"} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("menu-icon")).toHaveLength(1);
    userEvent.click(screen.getByRole("menu-icon"));
    expect(screen.getAllByRole("menu-icon")).toHaveLength(3);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
