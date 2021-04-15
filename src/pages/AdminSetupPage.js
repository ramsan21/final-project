import { Box, Grid, Typography, Link, Breadcrumbs } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import tableIcons, { options } from '../component/Universal/table_attributes';
import { constructObject, data } from './GeneralSetup';

const useStyles = makeStyles(theme => ({
    tableToolbar: {
        '&.MTableToolbar-root-24': {
            minHeight: theme.spacing(5) + 'px !important'
        }
    }
}))

export const AdminSetupPage = () => {

    const classes = useStyles();
    const tableOptions = {
        ...options,
        search: false,
        toolbar: true,
        sorting: true,
        pageSize: 5,
        filtering: true
    }

    const columnsDcdiag = [
        { cellStyle: { width: '2%' }, headerStyle: { width: '2%' }, sorting: false },
        { title: 'DC Name', field: 'dc_name', lookup: constructObject(data.map(d => (d.dc_name))) },
        { title: 'DCDiag Check', field: 'dc_diag_check', lookup: constructObject(data.map(d => (d.dc_diag_check))) },
        { title: 'Failure Reason', field: 'failure_reason', lookup: constructObject(data.map(d => (d.failure_reason))) },
        { title: 'Last Reported time', field: 'reported_time', filtering: false }
    ];
    const columnsCertificates = [
        { cellStyle: { width: '2%' }, headerStyle: { width: '2%' }, sorting: false },
        { title: 'DC Name', field: 'dc_name', lookup: constructObject(data.map(d => (d.dc_name))) },
        { title: 'Cert Name', field: 'cert_name', lookup: constructObject(data.map(d => (d.cert_name))) },
        { title: 'Issuer', field: 'issuer', lookup: constructObject(data.map(d => (d.issuer))) },
        { title: 'Status', field: 'status', lookup: constructObject(data.map(d => (d.status))) },
        { title: 'Last Reported time', field: 'reported_time', filtering: false }
    ];
    const coulmnsMaintenance = [
        { cellStyle: { width: '2%' }, headerStyle: { width: '2%' }, sorting: false },
        { title: 'DC Name', field: 'dc_name' },
        { title: 'Status', field: 'status' },
        { title: 'Last Reported time', field: 'reported_time', filtering: false }
    ];
    const coulmnsRestartedMaintenance = [
        { cellStyle: { width: '2%' }, headerStyle: { width: '2%' }, sorting: false },
        { title: 'DC Name', field: 'dc_name' },
        { title: 'Restarted By', field: 'restarted_by' },
        { title: 'Restarted At', field: 'restarted_at', filtering: false }
    ];
    return (
        <React.Fragment>
            <Box minHeight="100vh" pl={1}>

                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Cogent</Typography>
                    <Link color="inherit" href="/domain" >
                      Admin Setup Page
                    </Link>  
                </Breadcrumbs>

                <Box mb={2}>
                    <Typography variant="subtitle2" gutterBottom>(DCDIAG checks failed)</Typography>
                    <MaterialTable title=""
                        className={classes.tableToolbar}
                        options={tableOptions}
                        data={data}
                        columns={columnsDcdiag}
                        icons={tableIcons} />
                </Box>
                <Box mb={2}>
                    <Typography variant="subtitle2" gutterBottom>(Certificates that needs attention)</Typography>
                    <MaterialTable title=""
                        options={tableOptions}
                        data={data}
                        columns={columnsCertificates}
                        icons={tableIcons} />
                </Box>
                <Box mb={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>(DC's is offline / Under Maintenance mode)</Typography>
                            <MaterialTable title=""
                                options={tableOptions}
                                columns={coulmnsMaintenance}
                                data={data}
                                icons={tableIcons} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" gutterBottom>(DC's that were restarted in last 24 hrs)</Typography>
                            <MaterialTable title=""
                                options={tableOptions}
                                data={data}
                                columns={coulmnsRestartedMaintenance}
                                icons={tableIcons} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>);
}