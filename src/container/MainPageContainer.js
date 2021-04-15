import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import React, { PureComponent } from 'react';
import MainPage from '../component/MainPage';
import MROTheme from '../theme';

class MainPageContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            opensidebar: false
        }
    }

    toggleSideBar = (e) => {
        this.setState({
            opensidebar: !this.state.opensidebar
        });
    }

    render() {
        return (
            <MainPage {...this.props} opensidebar={this.state.opensidebar} toggleHandler={this.toggleSideBar} />
        );
    }
}

export default MainPageContainer;
