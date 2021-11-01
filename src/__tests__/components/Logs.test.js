import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logs from "../../component/Logs";

afterAll(cleanup);

describe("Logs Component", () => {
  test("Checking if prop values appear in DOM", async () => {
    const logs = [
      {
        status: "primary",
        task: "Repave Ready",
        tasktime: "30-03-2021 17:05:06 PM",
      },
      {
        status: "error",
        task: "Repave in Progress",
        tasktime: "30-03-2021 17:07:06 PM",
      },
      {
        status: "",
        task: "No Progress",
        tasktime: "30-03-2021 17:09:06 PM",
      },
    ];
    render(<Logs logs={logs} />);
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(screen.getByText("Repave Ready")).toBeInTheDocument();
    expect(screen.getByText("30-03-2021 17:05:06 PM")).toBeInTheDocument();
    expect(screen.getByText("Repave in Progress")).toBeInTheDocument();
    expect(screen.getByText("30-03-2021 17:07:06 PM")).toBeInTheDocument();
    expect(screen.getByText("No Progress")).toBeInTheDocument();
    expect(screen.getByText("30-03-2021 17:09:06 PM")).toBeInTheDocument();
  });
});
