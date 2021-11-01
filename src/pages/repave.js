import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  // TableHead,
  TableCell,
  CircularProgress,
  Breadcrumbs,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import tableIcons, { options } from "../component/Universal/table_attributes";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ToastMessageContext } from "../lib/contexts/message.context";
import ConfirmAlertDialog from "../component/Universal/confirm-alert-dialog";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { CsvBuilder } from "filefy";
import moment from "moment";
import { getCurrentTimeZone } from "../lib/utils";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  action: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  tableToolbar: {
    "&.MTableToolbar-root-24": {
      minHeight: `${theme.spacing(5)}px !important`,
    },
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  root: {
    width: 500,
    "& > *+ *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export const RepavePage = ({ history }) => {
  const [datalist, setDataList] = useState([]);
  const [selections, setSelections] = useState([]);
  const [dataDomains, setDataDomains] = useState([]);
  const [optionsDomains, setOptionsDomains] = useState([]);
  const tableRef = useRef();
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  //const repaveJSON = require('../config/repave.json');
  //const config = repaveJSON[process.env.REACT_APP_ENV];

  useEffect(() => {
    axios
      .get("http://localhost:3001/adinventory")
      .then((response) => {
        let responseData = response.data; //.filter(i=>i.repave_status==="PAVECompleted')
        setDataList(responseData);
        setDataDomains(responseData);
        //get only domain attributes
        let onlyDomains = responseData.map(function (obj) {
          return { domain_fqdn: obj.domain_fqdn };
        });
        //remove duplicates from domain values
        setOptionsDomains(
          _.uniqBy(onlyDomains, function (p) {
            return p.domain_fqdn;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoading(false);
      });

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);
    return () => {
      clearInterval(timer);
      tableRef && tableRef.current && tableRef.current.onAllSelected(false);
    };
  }, []);

  const repaveTableOptions = {
    ...options,
    search: true,
    sorting: true,
    selection: true,
    exportButton: { csv: true },
    exportCsv,
    headerStyle: { textAlign: "left" },
    cellStyle: { textAlign: "left" },
  };

  return (
    <React.Fragment>
      <Box py={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/" className={classes.link}>
            <Home className={classes.icon} />
            DC REPAVE
          </Link>
        </Breadcrumbs>
      </Box>
      {dataLoading !== true ? (
        <Box
          minHeight="74vh"
          display="flex"
          flexDirection="column"
          mt={2}
          p={2}
        >
          <Filter
            history={history}
            setDataList={setDataList}
            dataList={datalist}
            onFilter={(f) => f}
            currentSelections={selections}
            dataDomains={dataDomains}
            optionsDomains={optionsDomains}
          />
          <Alert severity="info">
            <AlertTitle>
              Select the domain controller that you want to repave and click on{" "}
              <strong>TRIGGER REPAVE!</strong>
            </AlertTitle>
          </Alert>
          <MaterialTable
            id="pave"
            title=""
            icons={tableIcons}
            options={repaveTableOptions}
            columns={repaveColumns}
            data={datalist}
            onSelectionChange={(rows) => {
              setSelections(rows.map((row) => row));
            }}
            style={{ zIndex: "0", fontSize: "16px" }}
            detailPanel={(rowData) => {
              return (
                <Box pl={5} p={1}>
                  {repaveDetailsHTable(rowData)}
                </Box>
              );
            }}
          />
        </Box>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "76vh" }}
        >
          <Grid item xs={3}>
            <Box pt={0.5}>
              <Typography variant="subtitle2">Loading ...</Typography>
            </Box>
            <CircularProgress color="primary" />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export const Filter = ({
  currentSelections,
  history,
  setDataList,
  dataDomains,
  optionsDomains,
}) => {
  const [state, setState] = useState({
    domains: [],
    adSites: [],
    assetNames: [],
  });
  const [update, setUpdate] = useState("");
  const message = useContext(ToastMessageContext);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [optionsADSite, setOptionsADSite] = useState([]);
  const [optionsAssetName, setOptionsAssetName] = useState([]);
  // const [jsonValidateResponse, setJsonValidateResponse] = useState([]);
  // const [validationStatus, setValidationStatus] = useState(true);

  // const handleClear = () => {
  //   let newData = dataDomains;
  //   const { domains, adSites, assetNames } = state;
  //   setDataList(dataDomains);
  //   setState({
  //     domains: [],
  //     adSites: [],
  //     assetNames: [],
  //   });
  // };

  useEffect(() => {
    const { domains, adSites, assetNames } = state;
    if (update === "domain" && domains.length === 0) {
      setState({
        domains: [],
        adSites: [],
        assetNames: [],
      });
      var clearButtonList = document.getElementsByClassName(
        "MuiAutocomplete-clearIndicatorDirty"
      );
      for (var i = 0; i < clearButtonList.length; i++) {
        clearButtonList[i].click();
      }
    } else if (update === "adSite" && adSites.length === 0) {
      setState({
        domains: domains,
        adSites: [],
        assetNames: [],
      });

      var assetNameClear = document
        .getElementById("passetname-label")
        .parentElement.getElementsByClassName(
          "MuiAutocomplete-clearIndicatorDirty"
        )[0];

      if (assetNameClear !== undefined) {
        assetNameClear.click();
      }
      setOptionsAssetName([]);
    }
    if (!!domains.length) {
      let result = dataDomains;
      result = result.filter((e1) =>
        domains.map((e2) => e2.domain_fqdn).includes(e1.domain_fqdn)
      );
      if (update === "domain") {
        let onlyADsites = result.map(function (obj) {
          return { ad_site: obj.ad_site };
        });
        //remove duplicates from ADsite values
        setOptionsADSite(
          _.uniqBy(onlyADsites, function (p) {
            return p.ad_site;
          })
        );
      }
      if (!!adSites.length) {
        result = result.filter((e1) =>
          adSites.map((e2) => e2.ad_site).includes(e1.ad_site)
        );
        if (update === "adSite" && !!adSites.length) {
          let onlyAssetName = result.map(function (obj) {
            return { asset_name: obj.asset_name };
          });
          //remove duplicates from ADsite values
          setOptionsAssetName(
            _.uniqBy(onlyAssetName, function (p) {
              return p.asset_name;
            })
          );
        }
      }
      if (!!assetNames.length) {
        result = result.filter((e1) =>
          assetNames.map((e2) => e2.asset_name).includes(e1.asset_name)
        );
      }
      setDataList(result);
    } else {
      setDataList(dataDomains);
      setOptionsADSite([]);
      setOptionsAssetName([]);
    }
  }, [
    update,
    state.domains.length,
    state.adSites.length,
    state.assetNames.length,
  ]);

  const classes = useStyles();
  // const [prevalidation, setPrevalidation] = useState(true);

  const VGRepave = (e) => {
    if (currentSelections && !currentSelections.length) {
      return message.showToastMessage({
        message: "No selection found for " + e.target.innerHTML,
        variant: "error",
      });
    } else if (currentSelections.length > 20) {
      return message.showToastMessage({
        message: "Maximum selection is 10 for " + e.target.innerHTML,
        variant: "error",
      });
    } else if (validateSelection()) {
      return message.showToastMessage({
        message: "Host with PAVECompleted status are only allowed to Repave",
        variant: "error",
      });
    }

    handlePrevalidation();
  };
  // const PHRepave = (e) => {

  // setDialogTitle('Enter valid Asset Name and SNOW Change ID to repave Physical Host');
  // setActionType("PH-Repave");
  // setDialogMessage('')
  // triggerPrompt()
  // )
  function validateSelection() {
    let status = false;
    for (var i = 0; i < currentSelections.length; i++) {
      if (currentSelections[i].repave_status !== "PAVECompleted") {
        status = true;
        break;
      }
    }
    return status;
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [ITSM, setITSM] = useState("");
  const [assetName, setAssetName] = useState("");

  // const triggerPrompt = () => {
  //   setOpenDialog(true);
  // };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onChangeITSM = (e) => {
    setITSM(e.target.value);
  };

  const onChangeAssetName = (e) => {
    setAssetName(e.target.value.toLowerCase());
  };

  const handlePrevalidation = () => {
    //     let promises = [];
    //     let reqType = '';
    //     let validationResults = []
    //     let validationStatus = true;
    //     currentSelections.map((dt) => (
    //         promises.push(
    //         axios.get(`${process.env.REACT_APP_API_URL}/api/v1/validatdc/${dt.asset_name}`)
    //         .then(res => {
    //         let jsonRes = JSON.parse(JSON.stringify(res.data));
    //         console.log(JSON.stringify (res.data));
    //         console.log(jsonRes['status']);
    //         if (jsonRes[ 'status'] === false)
    //         {
    //             validationStatus = false;
    //         }
    //         validationResults.push(jsonRes);
    //         console.log(validationResults);
    //     //message. showToastMessage({ message: 'Successfully ' + res.statusText + ' for ' + dt.asset_name, variant: 'success' })
    //         })
    //     .catch(error => {
    //         if (error.response) {
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //         let msg = JSON.stringify(error.response.data);
    //         message.showToastMessage({ message: msg, variant: 'error' })
    //         }else if(error.request) {
    //         console.log(error.request);
    //         message.showToastMessage({ message: JSON.stringify (error.request), variant: 'error' })
    //         }else if(error.message){
    //         console.log('Error', error.message);
    //         message.showToastMessage({ message: JSON.stringify(error.message), variant: 'error' })
    //         }
    //     })
    //     )));
    //     Promise.all(promises).then(() => {
    //     console.log("validation status : " + validationStatus);
    //     if (validationStatus===false)
    //     {
    //     setPrevalidation(false);
    //     setDialogMessage(<List>
    //         {_.map(validationResults, (item) => (
    //         <ListItem>
    //             <ListItemText>{item['assset_name']}</ListItemText>
    //             <ListItemText style={{marginLeft: "50px", color: "#f44336"}}>{item['message']}</ListItemText>
    //             </ListItem>
    //     ))}
    //     </List>);
    //     setDialogTitle('Prevalidation failed for following assets, please correct it before submitting');
    //     }
    //     else
    //     {
    //     setPrevalidation(true);
    //     setDialogTitle("Enter valid SNOW Change ID to Repave Virtual Guest");
    //     var msg = '';
    // setDialogMessage(<List>
    //     {currentSelections.map((dt) => (
    //     <ListItem><ListItemText>{dt.asset_name}</ListItemText></ListItem>
    //     ))}
    //     </List>);
    //     }
    // triggerPrompt()
    // });
    //setOpenDialog(false);
  };
  const handleSubmit = (e) => {
    // let promises = [];
    // let reqType = '';
    // currentSelections.map((dt) => (
    //     promises.push(
    //     axios.post(`${process.env.REACT_APP_API_URL}/api/v1/requests/`, {
    //     asset_name: dt.asset_name, request_type: dt.host_type === "Physical Host"?"PH-Repave":"VG-Repave", status: 'New', itsm:ITSM, seal_id: 31400})
    //     .then(res => {
    //         console.log(res.statusText);
    //         message.showToastMessage({ message: 'Successfully ' + res.statusText + ' for ' + dt.asset_name, variant: 'success' })
    //         history.push('/tracking');
    //     })
    // .catch(error => {
    //     if (error.response) {
    //     console.log(error.response.data);
    //     console.log(error-response.status);
    //     console.log(error.response.headers);
    //     let msg = JSON.stringify (error.response.data);
    //     if (msg.lastIndexOf('[") > 0 && msg.lastIndexOf(""]'))
    //     {
    //         msg = msg.substring(msg.lastIndexOf('["')+2, msg.lastIndexOf('"]'));
    //     }
    //     message.showToastMessage({ message: msg, variant: 'error' })
    //     }else if(error.request){
    //     console.log(error.request);
    //     message.showToastMessage({ message: JSON.stringify(error.request), variant: 'error' })
    //     }else if(error.message) {
    //     console.log('Error', error.message);
    //     message.showToastMessage({ message: JSON.stringify (error.message), variant: 'error' })
    //     }
    //     }))
    //     ));
    //     Promise.all(promises).then(() => console.log('all done'));
    //     setOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Box my={2} width="100%">
        <Grid container alignItems="flex-start">
          <Grid item container xs={12} md={1}>
            <Box pt={0.5}>
              <Typography variant="subtitle2">FILTER :</Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} md={8} lg={8} spacing={1}>
            <Grid item container xs={12} md={3} lg={4}>
              <Autocomplete
                //style={{ width: "inherit" }}
                multiple
                id="pdomains"
                options={optionsDomains}
                getOptionLabel={(option) => option.domain_fqdn}
                defaultValue={[]}
                fullWidth
                onChange={(event, value) => {
                  setUpdate("domain");
                  setState({
                    ...state,
                    domains: value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="DOMAINS"
                    placeholder="SELECT DOMAINS"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Autocomplete
                disabled={optionsADSite.length === 0}
                fullWidth
                multiple
                id="padsite"
                options={optionsADSite}
                getOptionLabel={(option) => option.ad_site}
                defaultValue={[]}
                getOptionSelected={(option, value) => {
                  //nothing that is put in here will cause the warning to go away
                  if (value === "") {
                    return true;
                  } else if (value === option) {
                    return true;
                  }
                }}
                onChange={(event, value) => {
                  setUpdate("adSite");
                  setState({
                    ...state,
                    adSites: value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="AD SITE"
                    placeholder="SELECT AD SITE"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Autocomplete
                disabled={optionsAssetName.length === 0}
                fullWidth
                multiple
                id="passetname"
                options={optionsAssetName}
                getOptionLabel={(option) => option.asset_name}
                defaultValue={[]}
                getOptionSelected={(option, value) => {
                  if (value === "") {
                    return true;
                  } else if (value === option) {
                    return true;
                  }
                }}
                onChange={(event, value) => {
                  setUpdate("assetName");
                  setState({
                    ...state,
                    assetNames: value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="ASSET NAME"
                    placeholder="SELECT ASSET NAME"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3} lg={3} justify="flex-end">
            <Grid item container justify="flex-end" className={classes.action}>
              <Button
                id="paveButton"
                variant="contained"
                className={classes.Button}
                onClick={(e) => VGRepave(e)}
                color="primary"
                style={{ maxWidth: "220px", minWidth: "220px" }}
              >
                TRIGGER REPAVE
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <ConfirmAlertDialog
          open={openDialog}
          prevalidation={true}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          title={dialogTitle}
          children={dialogMessage}
          onChangeITSM={onChangeITSM}
          onChangeAssetName={onChangeAssetName}
        />
      </Box>
    </React.Fragment>
  );
};

// export const Spacer = ({ height }) => {
//   return (
//     <React.Fragment>
//       <div style={{ height: height || "10px", width: "100%" }}></div>
//     </React.Fragment>
//   );
// };
// export const constructObject = (arr) => {
//   let obj = {};
//   arr.forEach((item, index) => {
//     obj[arr[index]] = arr[index];
//   });
//   return obj;
// };

const repaveDetailsHTable = (rowData) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid>
        <Table aria-label="Domain Details">
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                FQDN
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.fqdn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                LOCATION ID{" "}
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.location_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                REGION
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                IP ADDRESS
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.ip_address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                OS
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.os}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                STATUS
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                SUB STATUS
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.sub_status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                PATCHING WINDOW
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.sccm_patching_window}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                HOST TYPE
              </TableCell>
              <TableCell style={{ fontWeight: "bold", width: 1 }} align="left">
                :
              </TableCell>
              <TableCell align="left">{rowData.host_type}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

const exportCsv = (allColumns, allData) => {
  //const columns = allColumns.filter(columnDef => columnDef["export"] !== false);
  const columns = repaveColumns.concat(exportColumns);
  const exportedData = allData.map((rowData) =>
    columns.map((columnDef) => rowData[columnDef.field])
  );
  new CsvBuilder("Assets_" + moment().format("YYYY-MM-DDTHHmmss") + ".csv")
    .setDelimeter(",")
    .setColumns(columns.map((columnDef) => columnDef.title))
    .addRows(exportedData)
    .exportFile();
};

const exportColumns = [
  {
    title: "Verum",
    field: "verum_inv",
  },
  {
    title: "Location ID",
    field: "location_id",
  },
  {
    title: "Region",
    field: "region",
  },
  {
    title: "IP Address",
    field: "ip_address",
  },
  {
    title: "OS",
    field: "os",
  },
  {
    title: "Longitude",
    field: "longitude",
  },
  {
    title: "Latitude",
    field: "latitude",
  },
  {
    title: "Status",
    field: "status",
  },
  {
    title: "Sub Status",
    field: "sub_status",
  },
  {
    title: "is DC",
    field: "is_dc",
  },
  {
    title: "Business Load",
    field: "business_load",
  },
  {
    title: "In Maintenance",
    field: "in maintenance",
  },
];

const repaveColumns = [
  {
    title: "ASSET NAME",
    field: "asset_name",
  },
  {
    title: "DOMAIN",
    field: "domain_fqdn",
  },
  {
    title: "AD SITE",
    field: "ad_site",
  },
  {
    title: "REPAVE STATUS",
    field: "repave_status",
    render: (rowData) => {
      return rowData.repave_status.toUpperCase() === "PAVECOMPLETED" ? (
        <Typography
          style={{
            background: "#388e3c",
            border: 0,
            borderradius: 3,
            color: "white",
            height: 27,
            width: 160,
            padding: "3px 7px",
            textAlign: "center",
          }}
          color={"secondary"}
        >
          {rowData.repave_status}
        </Typography>
      ) : rowData.repave_status.toUpperCase() === "REPAVEINPROGRESS" ? (
        <Typography
          style={{
            background: "#01579b",
            border: 0,
            borderRadius: 3,
            color: "white",
            height: 27,
            width: 160,
            padding: "3px 7px",
            textAlign: "center",
          }}
          color={"secondary"}
        >
          {rowData.repave_status}
        </Typography>
      ) : rowData.repave_status.toUpperCase() === "DCDEMOINPROGRESS" ? (
        <Typography
          style={{
            background: "#8bc34a",
            border: 0,
            borderradius: 3,
            color: "white",
            height: 27,
            width: 160,
            padding: "3px 7px",
            textAlign: "center",
          }}
          color={"secondary"}
        >
          {rowData.repave_status}
        </Typography>
      ) : rowData.repave_status.toUpperCase() === "NOT AVAILABLE" ? (
        <Typography
          style={{
            background: "#9e9e9e",
            border: 0,
            borderradius: 3,
            color: "white",
            height: 27,
            width: 160,
            padding: "3px 7px",
            textAlign: "center",
          }}
          color={"secondary"}
        >
          {rowData.repave_status}
        </Typography>
      ) : (
        <Typography
          style={{
            background: "#008394",
            border: 0,
            borderRadius: 3,
            color: "white",
            height: 27,
            width: 160,
            padding: "3px 7px",
            textAlign: "center",
          }}
          color={"secondary"}
        >
          {rowData.repave_status}
        </Typography>
      );
    },
  },
  {
    title: "PROMOTED TIME (" + getCurrentTimeZone() + ")",
    field: "promoted_time",
    render: (rowData) =>
      moment.utc(rowData.promoted_time).local().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "DATA CENTER",
    field: "common_bldg_name",
  },
];
