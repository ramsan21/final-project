import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import tableIcons, {
  options,
  ICON_COLOUR,
} from "../../../component/Universal/table_attributes";

afterEach(cleanup);

describe("Table Attributes - Universal Component", () => {
  test("Expect icon colour to be #70707099", () => {
    expect(ICON_COLOUR).toBe("#70707099");
  });
  Object.keys(tableIcons).forEach((key) => {
    test(`Checking each tableIcons property: ${key}`, () => {
      const IconElemnt = tableIcons[key];
      render(<IconElemnt />);
      expect(document.querySelector("svg")).toBeInTheDocument();
    });
  });
  test("Testing the length of tableIcons", () => {
    expect(Object.keys(tableIcons)).toHaveLength(18);
  });
  test("Testing the length of options", () => {
    expect(Object.keys(options)).toHaveLength(13);
  });
});
