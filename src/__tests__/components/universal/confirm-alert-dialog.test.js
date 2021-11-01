import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmAlertDialog from "../../../component/Universal/confirm-alert-dialog";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("Confirm Alert Dialog - Universal Component", () => {
  test("Checking if it renders and submit event handler is called", () => {
    const handleSubmit = jest.fn();
    render(
      <ConfirmAlertDialog
        open={true}
        handleClose={jest.fn()}
        handleSubmit={handleSubmit}
        title={"My Unique Title"}
      />
    );
    expect(screen.getByText("My Unique Title")).toBeInTheDocument();
    expect(screen.queryByText("Agree")).toBeInTheDocument();
    expect(screen.getByText("Disagree")).toBeInTheDocument();
    userEvent.click(screen.queryByText("Agree"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  test("Checking if Disagree event handler is called", () => {
    const handleClose = jest.fn();
    render(
      <ConfirmAlertDialog
        open={true}
        handleClose={handleClose}
        handleSubmit={jest.fn()}
        title={"My Unique Title"}
      />
    );
    userEvent.click(screen.queryByText("Disagree"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  test("Dialog doesn't render when open prop is false", () => {
    render(
      <ConfirmAlertDialog
        open={false}
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        title={"My Unique Title"}
      />
    );
    expect(screen.queryByText("My Unique Title")).toBeNull();
  });
});
