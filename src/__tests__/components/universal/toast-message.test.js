import React, { useContext, useEffect } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastMessage from "../../../component/Universal/toast-message";
import ToastMessageProvider, {
  ToastMessageContext,
} from "../../../lib/contexts/message.context";
import "@testing-library/jest-dom";

afterEach(cleanup);

const ChangeContext = ({ open, variant, message, children }) => {
  const messageContext = useContext(ToastMessageContext);
  useEffect(() => {
    messageContext.showToastMessage({
      open: open,
      variant: variant,
      message: message,
    });
  }, []);
  return <>{children}</>;
};

describe("Toast Message - Universal Component", () => {
  test("Checking when open context changed to false", async () => {
    render(
      <ToastMessageProvider>
        <ChangeContext
          open={false}
          variant={"success"}
          message={"You have successfully submitted your data"}
        >
          <ToastMessage />
        </ChangeContext>
      </ToastMessageProvider>
    );
    expect(screen.queryByRole("button", { name: "close" })).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });
  test("Checking if changing context creates a toast message", async () => {
    render(
      <ToastMessageProvider>
        <ChangeContext
          open={true}
          variant={"warning"}
          message={"This is a warning"}
        >
          <ToastMessage />
        </ChangeContext>
      </ToastMessageProvider>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
    expect(screen.getByText("This is a warning")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByRole("This is a warning")).toBeNull();
  });
});
