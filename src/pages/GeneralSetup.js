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
import MROAutocomplete from '../component/FormComponents/Autocomplete';
import CustomizedHookAutoComplete from '../component/FormComponents/CustomisedHookAutoComplete';

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
        setDataList(data)
        return () => {
            tableRef && tableRef.current && tableRef.current.onAllSelected(false);
        }
    }, [])

    console.log(dataList)

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
                <Filter history={history}
                    setDataList={setDataList}
                    dataList={dataList} onFilter={f => setFilter(f)} currentSelections={selections} />
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

export const Filter = ({ currentSelections, history, setDataList }) => {

    const [state, setState] = useState({
        forests: [],
        domains: [],
        dcNames: []
    });
    const [update, setUpdate] = useState('');
    const message = useContext(ToastMessageContext);

    const handleClear = () => {
        setDataList(data)
    }

    useEffect(() => {
        const { forests, domains, dcNames } = state;
        if (update === 'forest' && !!forests.length) {
            setDataList(state.forests)
        } else if (update === 'domain' && !!domains.length) {
            setDataList(state.domains)
        } else if (update === 'dc_name' && !!dcNames.length) {
            setDataList(state.dcNames)
        }
    }, [update, state.forests.length, state.domains.length, state.dcNames.length])

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
                        <Grid item container xs={12} md={3} lg={3}>
                            <CustomizedHookAutoComplete
                                options={data}
                                handleClear={handleClear}
                                optionLabel="forest"
                                label="Forests"
                                getState={(data) => {
                                    setUpdate('forest')
                                    setState({
                                        ...state,
                                        forests: data
                                    })
                                }}
                            />
                            {/* <MROAutocomplete
                                handleClear={handleClear}
                                options={data}
                                label="Forest"
                                optionLabel="forest"
                                getState={(data) => {
                                    setUpdate('forest')
                                    setState({
                                        ...state,
                                        forests: data
                                    })
                                }}
                                multiple
                                limitTags={1}
                            /> */}

                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <CustomizedHookAutoComplete
                                options={state.forests}
                                optionLabel="domain"
                                label="Domain"
                                getState={(data) => {
                                    setUpdate('domain')
                                    setState({
                                        ...state,
                                        domains: data
                                    })
                                }}
                            />
                            {/* <MROAutocomplete
                                options={state.forests}
                                label="Domain"
                                optionLabel="domain"
                                getState={(data) => {
                                    setUpdate('domain')
                                    setState({
                                        ...state,
                                        domains: data
                                    })
                                }}
                                multiple
                                limitTags={1}
                            /> */}

                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <CustomizedHookAutoComplete
                                options={state.forests}
                                optionLabel="dc_name"
                                label="DCName"
                                getState={(data) => {
                                    setUpdate('dc_name')
                                    setState({
                                        ...state,
                                        dcNames: data
                                    })
                                }}
                            />
                            {/* <MROAutocomplete
                                options={state.domains}
                                label="DC Name"
                                optionLabel="dc_name"
                                getState={(data) => {

                                    setUpdate('dc_name')
                                    setState({
                                        ...state,
                                        dcNames: data
                                    })
                                }}
                                multiple
                                limitTags={1}
                            /> */}

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

