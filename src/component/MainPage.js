import React from "react";
import MiniDrawerContainer from "../container/MiniDrawerContainer";
import { Routing } from "./Routing";
import { useStyles } from "../static/MiniDrawerStyles";
// import AppBarComponent from './AppBarComponent';

function MainPage(props) {
  const classes = useStyles;
  const { opensidebar, toggleHandler } = props;

  return (
    <div className={classes.root}>
      {/* <AppBarComponent /> */}
      <MiniDrawerContainer
        {...props}
        opensidebar={opensidebar}
        sidebarclick={toggleHandler}
      />
      <Routing opensidebar={opensidebar} sidebarclick={toggleHandler} />
    </div>
  );
}

export default MainPage;
