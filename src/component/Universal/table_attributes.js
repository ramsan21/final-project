import React from "react";
import { forwardRef } from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import ViewColumn from '@material-ui/icons/ViewColumn';

export const ICON_COLOUR = "#70707099";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox fontSize="small" color="secondary" {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check fontSize="small" color="primary" {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear fontSize="small" htmlColor={ICON_COLOUR} {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline fontSize="small" htmlColor={ICON_COLOUR} {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight fontSize="small" color="primary" {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit fontSize="small" htmlColor={ICON_COLOUR} {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt fontSize="small" color="primary" {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList fontSize="small" color="primary" {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage fontSize="small" {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage fontSize="small" {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight fontSize="small" {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft fontSize="small" {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear fontSize="small" color="primary" {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search fontSize="small" color="primary" {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward fontSize="small" {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove fontSize="small" {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn fontSize="small" {...props} ref={ref} />),
    Settings: forwardRef((props, ref) => <Settings fontSize="small" color="primary" {...props} ref={ref} />),
};

export const options = {
    actionsColumnIndex: -1,
    selectableRowsOnClick: false,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 30, 50],
    searchFieldStyle: {
        width: '350px'
    },
    rowStyle: {
        textAlign: 'center'
    },
    headerStyle: {
        textAlign: 'center'
    },
    cellStyle: {
        textAlign: 'center'
    },
    draggable: false,
    searchable: true,
    sorting: false,
    emptyRowsWhenPaging: false,
    debounceInterval: 600
};

export default tableIcons;