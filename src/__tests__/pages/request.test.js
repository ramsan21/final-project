import React from "react";
import axios from "axios";
import { render, act, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  constructObject,
  Filter,
  RequestPage,
  Spacer,
} from "../../pages/request";
import { MemoryRouter } from "react-router-dom";
import _ from "lodash";
import * as data from "./data.json";

const original = console.error;

jest.mock("axios");

afterEach(cleanup);

describe("Request Page Component", () => {
  // test("constructObject Function", async () => {
  //   const arr = ["one", "two", "three"];
  //   const newObj = constructObject(arr);
  //   const newObjEntries = Object.entries(newObj);
  //   expect(newObjEntries[0][0]).toContain("one");
  //   expect(newObjEntries[0][1]).toContain("one");
  //   expect(newObjEntries[1][0]).toContain("two");
  //   expect(newObjEntries[1][1]).toContain("two");
  //   expect(newObjEntries[2][0]).toContain("three");
  //   expect(newObjEntries[2][1]).toContain("three");
  // });
  // test("Spacer Component", async () => {
  //   render(<Spacer height={"30px"} />);
  //   const allDivs = document.querySelectorAll("div");
  //   expect(allDivs[1].style.height).toBe("30px");
  // });
  test("Filter Component", async () => {
    const responseData = data.adinventory;
    const setDataList = jest.fn().mockImplementation((arr) => arr);
    let onlyDomains = responseData.map((obj) => {
      return { domain_fqdn: obj.domain_fqdn };
    });
    //remove duplicates from domain values
    onlyDomains = _.uniqBy(onlyDomains, function (p) {
      return p.domain_fqdn;
    });
    render(
      <MemoryRouter>
        <Filter
          currentSelections={[]}
          dataDomains={responseData}
          setDataList={setDataList}
          optionsDomains={onlyDomains}
        />
      </MemoryRouter>
    );
    const domainInput = screen.getByRole("textbox", { name: "DOMAINS" });
    const adSiteInput = screen.getByRole("textbox", { name: "AD SITE" });
    const assetNameInput = screen.getByRole("textbox", { name: "ASSET NAME" });

    expect(setDataList).toHaveBeenCalled();
    expect(screen.getByText("FILTER", { exact: false })).toBeInTheDocument();

    expect(domainInput).toHaveValue("");
    userEvent.click(domainInput);

    const domainOptions = screen.getAllByRole("option");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(domainOptions).toHaveLength(52);
    userEvent.click(domainOptions[0]);

    expect(screen.queryByRole("option")).toBeNull();
    userEvent.click(adSiteInput);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const adSiteOptions = screen.getAllByRole("option");
    expect(adSiteOptions).toHaveLength(50);
    userEvent.click(adSiteOptions[0]);

    expect(screen.queryByRole("option")).toBeNull();
    userEvent.click(assetNameInput);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const assetNameOptions = screen.getAllByRole("option");
    expect(assetNameOptions).toHaveLength(2);
    userEvent.click(assetNameOptions[0]);

    expect(screen.getByText("AD.DRKCHASECHASE.COM")).toBeInTheDocument();
    expect(screen.getByText("NA-MW-CO1-IDA")).toBeInTheDocument();
    expect(screen.getByText("ICPBELV05075")).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: "Open" })).toHaveLength(3);
  });
  test("Request Page Component no server", async () => {
    axios.get.mockRejectedValue({ error: "Something went wrong" });
    console.error = jest.fn();
    await act(async () =>
      render(
        <MemoryRouter>
          <RequestPage />
        </MemoryRouter>
      )
    );
    expect(screen.getByText(/no records to display/i)).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    console.error = original;
  });
  test("RequestPage Component with mocked server data", async () => {
    axios.get.mockResolvedValue({ data: data.adinventory });
    await act(async () =>
      render(
        <MemoryRouter>
          <RequestPage />
        </MemoryRouter>
      )
    );

    const allTableRows = screen.getAllByRole("row");

    expect(
      screen.getByRole("navigation", { name: "breadcrumb" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /domains/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /ad site/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /asset name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Search/i })
    ).toBeInTheDocument();
    expect(allTableRows).toHaveLength(12);
    expect(
      screen.getByRole("columnheader", { name: /asset name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /domain/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /ad site/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /repave status/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /promoted time \(sgt\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /data center/i })
    ).toBeInTheDocument();

    // userEvent.click(searchInput);

    userEvent.click(screen.getByRole("button", { name: "Export" }));
    expect(screen.getByText(/export as csv/i)).toBeInTheDocument();

    expect(screen.queryByRole(/export as csv/i)).toBeNull();

    userEvent.click(allTableRows[1].querySelector("button"));

    expect(screen.getByText(/fqdn/i)).toBeInTheDocument();
    expect(screen.getByText(/icpbelv05075\.AD\.DRK\.COM/i)).toBeInTheDocument();
    expect(screen.getByText(/location id/i)).toBeInTheDocument();
    expect(screen.getByText(/10031/i)).toBeInTheDocument();
    expect(screen.getByText(/region/i)).toBeInTheDocument();
    expect(screen.getByText(/NAMR/i)).toBeInTheDocument();
    expect(screen.getByText(/ip address/i)).toBeInTheDocument();
    expect(screen.getByText(/169\.90\.82\.79/i)).toBeInTheDocument();
    expect(screen.getByText("OS")).toBeInTheDocument();
    expect(
      screen.getByText(/windows server 2016 standard/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/installed/i)).toBeInTheDocument();
    expect(screen.getByText(/sub status/i)).toBeInTheDocument();
    expect(screen.getByText(/production/i)).toBeInTheDocument();
    expect(screen.getByText(/patching window/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Monthly Second Saturday 04:00-10:01/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/host type/i)).toBeInTheDocument();
    expect(screen.getByText(/physical host/i)).toBeInTheDocument();

    userEvent.click(allTableRows[1].querySelector("button"));

    expect(screen.queryByText(/icpbelv05075\.AD\.DRK\.COM/i)).toBeNull();
  });
});
