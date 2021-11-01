import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItemLink from "../../component/ListItemLink";
import { MemoryRouter } from "react-router-dom";

afterAll(cleanup);

describe("List Link Item Component", () => {
  test("Checking if prop values appear in DOM", async () => {
    render(
      <MemoryRouter>
        <ListItemLink
          open={false}
          to={"/home"}
          menuText={"home"}
          location={{ pathname: "/home" }}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button").getAttribute("href")).toBe("/home");
    expect(screen.getByText("home")).toBeInTheDocument();
  });
});
