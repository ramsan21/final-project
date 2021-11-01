import React from "react";
import { Switch, Route } from "react-router-dom";

import { RepavePage } from "../pages/repave";

import { DepartmentSetupPage } from "../pages/DepartmentSetupPage";
import { RequestPage } from "../pages/request";
import { useStyles } from "../static/MiniDrawerStyles";
import clsx from "clsx";
import SimpleAppBar from "./SimpleAppBar";
import { Box, Typography } from "@material-ui/core";
// import ToastMessage from "./Universal/toast-message";

export const Routing = (props) => {
  const { content, toolbar, contentShift } = useStyles();
  const { opensidebar } = props;

  return (
    <>
      <main
        className={clsx(content, {
          [contentShift]: opensidebar,
        })}
      >
        <SimpleAppBar />
        {/* <div className={toolbar} /> */}
        <Switch>
          <Route exact path="/" component={RepavePage} />
          <Route path="/RepavePage" exact component={RepavePage} />
          <Route path="/request" component={RequestPage} />
          <Route path="/dc-details" component={DepartmentSetupPage} />
        </Switch>
      </main>
      <Box
        width="100%"
        bgcolor="#174056"
        color="#fff"
        position="relative"
        bottom="0px"
        p={2.5}
        textAlign="center"
      >
        <Typography>Copyright Details</Typography>
      </Box>
    </>
  );
};
