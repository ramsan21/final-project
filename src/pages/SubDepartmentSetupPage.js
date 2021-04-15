import { Box, Card, CardContent, Divider, Grid, Grow, MenuItem, Breadcrumbs, Link, Paper, Switch, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Filter, } from './GeneralSetup';


const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing(25),
        height: theme.spacing(20),
        borderRadius: theme.spacing(1),
        cursor: 'pointer'
    },
    success: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightMedium
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightMedium
    },
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightMedium
    },
    textCenter: {
        textAlign: 'center'
    }
}));

export const SubDepartmentSetupPage = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Box minHeight="100vh" mt={2} p={2} >

                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Cogent</Typography>
                    <Link color="inherit" href="/inventory" >
                      Sub Dep Setup Page
                    </Link>  
                </Breadcrumbs>

                <Filter onFilter={e => console.log(e)} />
                <Box mt={1} display="flex" justifyContent="center">
                    <Grid container xs={12} md={10} lg={7} display="flex" justifyContent="center">
                        <Box width="100%" mb={2} display="flex" justifyContent="flex-end" alignItems="center">
                            <Typography component="span" variant="body2">** Number represents the failure count</Typography>
                        </Box>
                        <Grid item container justify="center" spacing={3}>
                            {
                                complianceList.map(compliance => <Grid item container key={compliance.title}
                                    justify="center"

                                    xs={12} sm={6} md={4} lg={4}>
                                    <Tooltip arrow title={
                                        <Typography variant="body2">
                                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                                        </Typography>
                                    }>
                                        <Card elevation={3} variant="elevation" className={clsx(classes.card, classes[compliance.staus])} >
                                            <CardContent>
                                                <Grid container item direction="column" justify="center" alignItems="center">
                                                    <Typography component="span" color="textSecondary" gutterBottom>
                                                        {compliance.title}
                                                    </Typography>
                                                    <Typography component="span" variant="h5" component="h2">
                                                        {compliance.count}
                                                    </Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Tooltip>
                                </Grid>)
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    )
}


const complianceList = [{
    title: 'SCOM',
    count: 6,
    staus: 'warning',
    description: ''
}, {
    title: 'SCCM',
    count: 12,
    staus: 'error',
    description: ''
}, {
    title: 'TIDEWAY',
    count: 0,
    staus: 'success',
    description: ''
}, {
    title: 'SPLUNK',
    count: 15,
    staus: 'error',
    description: ''
}, {
    title: 'CCS',
    count: 0,
    staus: 'success',
    description: ''
}, {
    title: 'SOFTWARES',
    count: 5,
    staus: 'warning',
    description: ''
}, {
    title: 'BACKUPS',
    count: 5,
    staus: 'warning',
    description: ''
}, {
    title: 'CERTIFICATES',
    count: 5,
    staus: 'warning',
    description: ''
}, {
    title: 'RMAD',
    count: 10,
    staus: 'error',
    description: ''
}, {
    title: 'Change Auditor',
    count: 0,
    staus: 'success',
    description: ''
},];
