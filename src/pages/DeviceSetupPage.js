import { Box, Divider, Grid, MenuItem, Switch, Typography, Breadcrumbs, Link } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import tableIcons, { options } from '../component/Universal/table_attributes';
import MROSelect from '../component/FormComponents/Select';
import { constructObject, data } from './GeneralSetup';

export const DeviceSetupPage = ({ history, ...props }) => {
    const [filter, setFilter] = useState()
    const [dataList, setDataList] = useState(data)
    const [currentSelection, setCurrentSelection] = useState({})

    useEffect(() => {
        if (filter == true) {
            setDataList(data.filter(i => i.status == 'In-progress'))
        } else {
            setDataList(data)
        }
    }, [filter])

    const tableOptions = {
        ...options,
        search: false,
        sorting: true,
        filtering: true,
    };

    const columns = [
        {
            title: 'Request #',
            field: 'request',
            filtering: false,
            render: rowData => <Typography color={currentSelection.request === rowData.request ? 'secondary' : 'textPrimary'}>
                {rowData.request}
            </Typography>
        },
        {
            title: 'DCName',
            field: 'dc_name',
            lookup: constructObject(data.map(d => (d.dc_name))),
            render: rowData => rowData.dc_name,
        },
        {
            title: 'Status',
            field: 'status',
            lookup: constructObject(data.map(d => (d.status))),
        },
        {
            title: 'Progress',
            field: 'progress',
            lookup: constructObject(data.map(d => (d.progress))),
        },
        {
            title: 'Last Updated',
            field: 'last_updated',
            render: rowData => moment(rowData.last_updated).format('DD-MM-YYYY HH:mm:ss A'),
            filtering: false
        }, {
            title: 'Owner',
            field: 'owner',
            lookup: constructObject(data.map(d => (d.owner))),
        }
    ]

    const onRowClick = (event, rowData) => {
        debugger;
        setCurrentSelection(rowData);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                history.push('/dc-details')
            }, 700);
        })
    }

    return (
        <React.Fragment>
            <Box minHeight="100vh" mt={2} p={2} >

                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Cogent</Typography>
                    <Link color="inherit" href="/device" >
                        Device
                    </Link>
                </Breadcrumbs>

                <Grid item xs={12}>
                    <Typography>(Repave Status Tracker:)</Typography>
                    <Divider />
                    <Spacer height={10} />
                </Grid>
                <Filter />
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Switch title="Show All" onChange={e => setFilter(e.target.checked)} />
                    <Typography component="span" variant="body2">Show All</Typography>
                </Box>
                <MaterialTable
                    title=""
                    icons={tableIcons}
                    options={{
                        ...tableOptions,
                    }}
                    columns={columns}
                    data={dataList}
                    actions={[
                        {
                            icon: '+',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}
                    onRowClick={(event, rowData) => onRowClick(null, rowData)}
                />
            </Box>
        </React.Fragment>
    )
}

const Filter = () => {

    return (
        <React.Fragment>
            <Box mt={0} mb={2} width="100%">
                <Grid container alignItems="flex-start">

                    <Grid item container xs={12} md={1} >
                        <Box pt={0.5}>
                            <Typography variant="subtitle2">Filter :</Typography>
                        </Box>
                    </Grid>
                    <Grid item container xs={12} md={8} lg={8} spacing={2}>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROSelect
                                name={"forest"}
                                label={"Forest"}
                                multiple
                            >
                                {data && data.map(item => <MenuItem key={item.forest} value={item.forest}>
                                    {item.forest}
                                </MenuItem>)}
                            </MROSelect>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROSelect
                                name={"domain"}
                                label={"Domain"}
                                multiple
                            >
                                {data && data.map(item => <MenuItem key={item.domain} value={item.domain}>
                                    {item.domain}
                                </MenuItem>)}
                            </MROSelect>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROSelect
                                name={"dc"}
                                label={"DataCenter"}
                                multiple
                            >
                                {data && data.map(item => <MenuItem key={item.d_center} value={item.d_center}>
                                    {item.d_center}
                                </MenuItem>)}
                            </MROSelect>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROSelect
                                name={"dc_name"}
                                label={"DC Name"}
                                multiple
                            >
                                {data && data.map(item => <MenuItem key={item.dc_name} value={item.dc_name}>
                                    {item.dc_name}
                                </MenuItem>)}
                            </MROSelect>
                        </Grid>
                    </Grid>

                </Grid>

            </Box>
        </React.Fragment>
    )
}

export const Spacer = ({ height }) => {
    return (<React.Fragment>
        <div style={{ height: height || '10px', width: '100%' }}>

        </div>
    </React.Fragment>)
}
