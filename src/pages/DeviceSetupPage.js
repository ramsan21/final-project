import { Box, Divider, Grid, MenuItem, Switch, Typography, Breadcrumbs, Link, TextField, IconButton, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import tableIcons, { options } from '../component/Universal/table_attributes';
import MROSelect from '../component/FormComponents/Select';
import { constructObject, data } from './GeneralSetup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MROAutocomplete from '../component/FormComponents/Autocomplete';

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
            render: rowData => <Button onClick={() => onRowClick(rowData)}>
                <Typography style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    textUnderlinePosition: 'auto'
                }} color={'secondary'}>
                    {rowData.request}
                </Typography>
            </Button>
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

    const onRowClick = (rowData) => {
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
                    // onRowClick={(event, rowData) => onRowClick(null, rowData)}
                    detailPanel={rowData => {
                        return (
                            <Box pl={2} p={1}>
                                <Typography>An example of a table with expandable rows, revealing more information. </Typography>
                            </Box>
                        )
                    }}
                />
            </Box>
        </React.Fragment >
    )
}

const Filter = () => {

    const [state, setState] = useState({
        forests: [],
        domains: [],
        dataCenters: [],
        dcNames: []
    })

    return (
        <React.Fragment>
            <Box mt={0} mb={2} width="100%">
                <Grid container alignItems="flex-start">

                    <Grid item container xs={12} md={1} >
                        <Box pt={0.5}>
                            <Typography variant="subtitle2">Filter :</Typography>
                        </Box>
                    </Grid>
                    <Grid item container xs={12} md={8} lg={9} spacing={2}>
                        <Grid item xs={12} md={6} lg={3} alignItems="center">

                            <MROAutocomplete
                                options={data}
                                label="Forest"
                                optionLabel="forest"
                                getState={(data) => setState({
                                    ...state,
                                    forests: data
                                })}
                                multiple
                                limitTags={1}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROAutocomplete
                                options={state.forests}
                                optionLabel="domain"
                                label="Domain"
                                getState={data => setState({
                                    ...state,
                                    domains: data
                                })}
                                multiple
                                limitTags={1}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROAutocomplete
                                options={state.domains}
                                label="DataCenter"
                                optionLabel="d_center"
                                getState={data => setState({
                                    ...state,
                                    dataCenters: data
                                })}
                                multiple
                                limitTags={1}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MROAutocomplete
                                options={state.dataCenters}
                                label="DC Name"
                                optionLabel="dc_name"
                                getState={(d) => console.log(d)}
                                multiple
                                limitTags={1}
                            />

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
