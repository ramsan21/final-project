import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { GeneralSetup } from '../pages/GeneralSetup';
import { AdminSetupPage } from '../pages/AdminSetupPage';
import { DepartmentSetupPage } from '../pages/DepartmentSetupPage';
import { SubDepartmentSetupPage } from '../pages/SubDepartmentSetupPage';
import { DeviceSetupPage } from '../pages/DeviceSetupPage';
import { useStyles } from '../static/MiniDrawerStyles';
import clsx from 'clsx';
import SimpleAppBar from './SimpleAppBar';
import { Box, Typography } from '@material-ui/core';


export const Routing = (props) => {
    const { content, toolbar, contentShift } = useStyles();
    const { opensidebar } = props;

    return (
        <>
            <main className={clsx(content, {
                [contentShift]: opensidebar,
            })}>
                <SimpleAppBar />
                {/* <div className={toolbar} /> */}
                <Switch>
                    <Route exact path='/' component={GeneralSetup} />
                    <Route path='/generalSetup' exact component={GeneralSetup} />
                    <Route path='/device' component={DeviceSetupPage} />
                    <Route path='/inventory' component={SubDepartmentSetupPage} />
                    <Route path='/dc-details' component={DepartmentSetupPage} />
                    <Route path='/domain' component={AdminSetupPage} />
                </Switch>
            </main>
            <Box width="100%" bgcolor="#174056" color="#fff" position="relative" bottom="0px" p={2.5} textAlign="center">
                <Typography>Copyright Details</Typography>
            </Box>
        </>
    );
}