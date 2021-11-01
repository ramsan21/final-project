import React from "react";
import MiniDrawer from "../component/MiniDrawer";

class MiniDrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  // handleClick = (e) => {
  //     this.setState({
  //         isOpen: !this.state.isOpen
  //     });
  // }

  render() {
    const { opensidebar, sidebarclick } = this.props;
    return (
      <MiniDrawer
        submenuopen={this.state.isOpen + ""}
        //onClickHandler={this.handleClick}
        opensidebar={opensidebar}
        handlesidebar={sidebarclick}
      />
    );
  }
}

export default MiniDrawerContainer;
