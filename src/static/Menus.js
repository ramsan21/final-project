import React from 'react';
import { GeneralSetup } from "../pages/GeneralSetup";
import { AdminSetupPage } from "../pages/AdminSetupPage";
import { DepartmentSetupPage } from "../pages/DepartmentSetupPage";
import { SubDepartmentSetupPage } from "../pages/SubDepartmentSetupPage";
import { DeviceSetupPage } from "../pages/DeviceSetupPage";
import { Settings, DesktopMac, Store, AccountBox } from "@material-ui/icons";

export const staticMenu = [
    {
        id: 1,
        menuName: 'General Setup',
        menuDescription: 'General setups menus',
        path: '/generalSetup',
        component: GeneralSetup,
        exact: true,
        icon: <Settings color="secondary" />,
        submenu: []
    },
    {
        id: 2,
        menuName: 'Device Setup',
        menuDescription: 'Device mac id setup menus',
        path: '/device',
        component: DeviceSetupPage,
        exact: true,
        icon: <DesktopMac color="secondary" />,
        submenu: []
    },
    {
        id: 3,
        menuName: 'Invenory Setup',
        menuDescription: 'Inventory setup menus',
        path: '/inventory',
        component: DeviceSetupPage,
        exact: true,
        icon: <Store color="secondary" />,
        submenu: []
    },
    {
        id: 4,
        menuName: 'DC Details',
        menuDescription: 'Dc Details',
        path: '/dc-details',
        component: DeviceSetupPage,
        exact: true,
        icon: <DesktopMac color="secondary" />,
        submenu: []
    },
    {
        id: 5,
        menuName: 'Domain',
        menuDescription: 'XYZ Domain',
        path: '/domain',
        component: DeviceSetupPage,
        exact: true,
        icon: <Store color="secondary" />,
        submenu: []
    },
];