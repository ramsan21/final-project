import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ToastMessageProvider from "../../lib/contexts/message.context";
import CustomizedTimeline from "../../component/CustomizedTimeline";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// beforeAll(() => render(<Breadcrumb />));
afterAll(cleanup);

describe("Customized Timeline Component", () => {
  test("Checking props", async () => {
    let currentLogs = [];
    const setLogs = jest.fn().mockImplementation((arr) => {
      currentLogs = [...currentLogs, arr];
    });
    render(
      <ToastMessageProvider>
        <CustomizedTimeline setLogs={setLogs} logs={currentLogs} />
      </ToastMessageProvider>
    );
    userEvent.click(screen.getByText("Step 2"));

    // Checking if The Confirm Dialog Alert has been rendered
    userEvent.click(screen.getByText("Agree"));

    expect(currentLogs).toHaveLength(1);

    userEvent.click(screen.getByText("Step 4"));
    userEvent.click(screen.getByText("Agree"));

    expect(currentLogs).toHaveLength(2);
  });
});
