import React from "react";

import { RepavePage } from "../pages/repave";

import { DepartmentSetupPage } from "../pages/DepartmentSetupPage";
import { RequestPage } from "../pages/request";

import { Settings, DesktopMac, Store, AccountBox } from "@material-ui/icons";

export const staticMenu = [
  {
    id: 1,
    menuName: "General Setup",
    menuDescription: "General setups menus",
    path: "/RepavePage",
    component: RepavePage,
    exact: true,
    icon: <Settings color="secondary" />,
    submenu: [],
  },
  {
    id: 2,
    menuName: "Device Setup",
    menuDescription: "Device mac id setup menus",
    path: "/request",
    component: RequestPage,
    exact: true,
    icon: <DesktopMac color="secondary" />,
    submenu: [],
  },
  {
    id: 3,
    menuName: "Inventory Setup",
    menuDescription: "Inventory setup menus",
    path: "/dc-details",
    component: DepartmentSetupPage,
    exact: true,
    icon: <Store color="secondary" />,
    submenu: [],
  },
];
