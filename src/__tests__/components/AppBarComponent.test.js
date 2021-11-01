import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AppBarComponent from "../../component/AppBarComponent";

afterAll(cleanup);

describe("App Bar Component", () => {
  test("Checking if it renders as it should", async () => {
    render(<AppBarComponent />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for products, brands and more")
    ).toBeInTheDocument();
    const classRegex = /makeStyles-appBarShift-3/g;
    expect(classRegex.test(screen.getByRole("banner").classList)).toBe(false);
    userEvent.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.getByRole("banner")).toHaveClass("makeStyles-appBarShift-3");
    userEvent.type(screen.getByRole("textbox"), "random test");
    expect(screen.getByRole("textbox").value).toBe("random test");
  });
});
