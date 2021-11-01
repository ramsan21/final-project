import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import GeneralDetails from "../../component/GeneralDetail";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("General Details Component", () => {
  test("Checking what happens if empty props are used", async () => {
    const data = {
      dc_name: "",
      domain_name: "",
      forest_name: "",
      ad_site: "",
      triggered_at: "",
      triggered_by: "",
    };
    render(<GeneralDetails data={data} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(5);
  });
  test("Checking if prop values appear in DOM", async () => {
    const data = {
      dc_name: "hello",
      domain_name: "www.hello.com",
      forest_name: "hello_forest",
      ad_site: "hello_ads",
      triggered_at: "12-09-2021",
      triggered_by: "Doe",
    };
    render(<GeneralDetails data={data} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("www.hello.com")).toBeInTheDocument();
    expect(screen.getByText("hello_forest")).toBeInTheDocument();
    expect(screen.getByText("hello_ads")).toBeInTheDocument();
    expect(screen.getByText("12-09-2021")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });
});
