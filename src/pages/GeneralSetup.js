import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, MenuItem, Typography, Breadcrumbs, Link } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import tableIcons, { options } from '../component/Universal/table_attributes';
import MROButton from '../component/FormComponents/Button';
import MROSelect from '../component/FormComponents/Select';
import { ToastMessageContext } from '../lib/contexts/message.context';
import ConfirmAlertDialog from '../component/Universal/confirm-alert-dialog';
import { useRef } from 'react';

const useStyles = makeStyles(theme => ({
    action: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }
    }
}));

export const GeneralSetup = ({ history }) => {
    const [filter, setFilter] = useState()
    const [dataList, setDataList] = useState(data)
    const [selections, setSelections] = useState([]);
    const tableRef = useRef();
    useEffect(() => {
        console.log('Table ', filter)

        if (filter) {

            let newDataList = data

            const { forest, domain, dc_name, } = filter

            if (forest) {
                newDataList = newDataList.filter(record => record.forest == forest)
            }

            if (domain) {
                newDataList = newDataList.filter(record => record.domain == domain)
            }

            if (dc_name) {
                newDataList = newDataList.filter(record => record.dc_name == dc_name)
            }

            console.log('data', newDataList)
            setDataList(newDataList)
        }

        return () => {
            tableRef && tableRef.current && tableRef.current.onAllSelected(false);
        }
    }, [filter])



    const tableOptions = {
        ...options,
        search: false,
        sorting: true,
        filtering: true,
        selection: true,
    };

    const columns = [
        {
            title: 'Forest',
            field: 'forest',
            lookup: constructObject(data.map(d => (d.forest))),
        }, {
            title: 'Domain',
            field: 'domain',
            lookup: constructObject(data.map(d => (d.domain))),
        },
        {
            title: 'DataCenter',
            field: 'd_center',
            lookup: constructObject(data.map(d => (d.d_center))),
        },
        {
            title: 'DCName',
            field: 'dc_name',
            lookup: constructObject(data.map(d => (d.dc_name))),
            render: rowData => rowData.dc_name,
        },
        {
            title: 'Last(Re)Paved',
            field: 'last_paved',
            render: rowData => moment(rowData.last_paved).format('DD-MM-YYYY'),
        },
        {
            title: 'Status',
            field: 'status',
        }
    ]

    return (
        <React.Fragment>
            <Box minHeight="100vh" mt={2} p={2} >
                <Filter history={history} onFilter={f => setFilter(f)} currentSelections={selections} />
                <MaterialTable
                    tableRef={tableRef}
                    title=""
                    icons={tableIcons}
                    options={tableOptions}
                    columns={columns}
                    data={dataList}
                    onSelectionChange={(rows) => {
                        setSelections(rows.map(row => row))
                    }}
                />
            </Box>
        </React.Fragment>
    )
}

/* eslint-disable no-use-before-define */
// export default function ComboBox() {
//   return (
//     <Autocomplete
//       id="combo-box-demo"
//       options={top100Films}
//       getOptionLabel={(option) => option.title}
//       style={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
//     />
//   );
// } 

export const Filter = ({ onFilter, currentSelections, history }) => {
    const [filter, setFilter] = useState()
    console.log(filter)
    const message = useContext(ToastMessageContext);

    useEffect(() => {
        onFilter(filter)
    }, [filter])

    const classes = useStyles();

    const checkSelections = () => {
        if (currentSelections && !currentSelections.length) {
            return message.showToastMessage({ message: 'No selection found', variant: 'error' })
        }
        triggerPrompt()
    }

    const [openDialog, setOpenDialog] = useState(false)
    const triggerPrompt = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleSubmit = () => {
        history.push('/device')
    }

    return (
        <React.Fragment>
            <Box my={2} width="100%">

                <Box pb={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="textPrimary">Cogent</Typography>
                        <Link color="inherit" href="/generalSetup" >
                            General Setup
                    </Link>
                    </Breadcrumbs>
                </Box>

                <Grid container alignItems="flex-start">
                    <Grid item container xs={12} md={1}>
                        <Box pt={0.5}>
                            <Typography variant="subtitle2">Filter :</Typography>
                        </Box>
                    </Grid>
                    <Grid item container xs={12} md={8} lg={8} spacing={1}>
                        <Grid item xs={12} md={3} lg={3}>
                            <Autocomplete
                                id="combo-box-forest"
                                onChange={(event, newValue, reason) => {
                                    if (reason == 'clear') {
                                        setFilter({ ...filter, forest: '' })
                                    }
                                    if (newValue && newValue.title) {
                                        setFilter({ ...filter, forest: newValue.title })
                                    }
                                }}
                                options={data && data.map(item => {
                                    return {
                                        title: item.forest
                                    }
                                })}
                                getOptionLabel={(option) => option.title}

                                renderInput={(params) => <TextField {...params} label="Forest" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <Autocomplete
                                id="combo-box-domain"
                                onChange={(event, newValue, reason) => {
                                    if (reason == 'clear') {
                                        setFilter({ ...filter, domain: '' })
                                    }
                                    if (newValue && newValue.title) {
                                        setFilter({ ...filter, domain: newValue.title })
                                    }
                                }}
                                options={data && data.map(item => {
                                    return {
                                        title: item.domain
                                    }
                                })}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => <TextField {...params} label="Domain" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <Autocomplete
                                clearText
                                multiple
                                limitTags={1}
                                id="combo-box-dc_name"
                                onChange={(event, newValue, reason) => {
                                    if (reason == 'clear') {
                                        setFilter({ ...filter, dc_name: '' })
                                    }
                                    if (newValue && newValue.title) {
                                        setFilter({ ...filter, dc_name: newValue.title })
                                    }
                                }}
                                options={data && data.map(item => {
                                    return {
                                        title: item.dc_name
                                    }
                                })}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => <TextField {...params} label="DC Name" variant="outlined" />}
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={2} lg={1}>
                            <MROSelect
                                name={"dc_name"}
                                label={"DC Name"}
                                multiple
                            >
                                {data && data.map(item => <MenuItem key={item.dc_name} value={item.dc_name}>
                                    {item.dc_name}
                                </MenuItem>)}
                            </MROSelect>
                        </Grid> */}
                    </Grid>
                    <Grid item container xs={12} md={3} lg={3} justify="flex-end">
                        <Grid item container justify="flex-end" className={classes.action}>
                            <MROButton onClick={checkSelections} variant="contained" color="secondary">Trigger Repave</MROButton>
                            <Spacer height={10} />
                            <MROButton onClick={checkSelections} variant="contained" color="secondary">Demote</MROButton>
                        </Grid>
                    </Grid>
                </Grid>
                <ConfirmAlertDialog open={openDialog} handleClose={handleClose} handleSubmit={handleSubmit} />
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

export const constructObject = arr => {
    let obj = {};
    arr.forEach((item, index) => {
        obj[arr[index]] = arr[index]
    })
    return obj;
};

export const data = Array.from(Array(10)).map((record, i) => ({
    forest: `Forest-${i + 1}`,
    domain: `Domain-${i + 1}`,
    d_center: `Center-${(i + 1) * 10}`,
    dc_name: `dcname${(i + 1) * 200}`,
    owner: 'E123456',
    progress: `${i + 1}/${(i + 1) + 10}`,
    request: `#${(i + 1) + 50}`,
    last_paved: Date.now(),
    status: 'PaveCompleted',
    reported_time: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss A'),
    failure_reason: 'Reason if any...',
    dc_diag_check: `Check Name-${i + 1}`,
    issuer: `Issuer name-${i + 1}`,
    cert_name: `Cert Name-${i + 1}`,
    restarted_by: 'E123456',
    restarted_at: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss A'),
}))

