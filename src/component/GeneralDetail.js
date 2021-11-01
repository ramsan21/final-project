import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    boxShadow: "0px 1px 4px #0000001A",
  },
}));

function GeneralDetails({ data, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container spacing={3} alignItems={"center"} justify={"center"}>
        <Grid key="1" item xs={12} md={4}>
          <div
            key="1"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>DC Name</Typography>
            <Typography variant={"subtitle2"}>
              {data.dc_name || "Hello"}
            </Typography>
          </div>
          <div
            key="2"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>Domain Name</Typography>
            <Typography variant={"subtitle2"}>
              {data.domain_name || "-"}
            </Typography>
          </div>
          <div
            key="3"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>Forest Name</Typography>
            <Typography variant={"subtitle2"}>
              {data.forest_name || "-"}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={10} md={2} />
        <Grid key="2" item xs={12} md={4}>
          <div
            key="4"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>AD Site</Typography>
            <Typography variant={"subtitle2"}>{data.ad_site || "-"}</Typography>
          </div>
          <div
            key="5"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>Repave triggered at</Typography>
            <Typography variant={"subtitle2"}>
              {data.triggered_at || "-"}
            </Typography>
          </div>
          <div
            key="6"
            className={"align-left-space-between flex-center"}
            style={{ width: "100%" }}
          >
            <Typography variant={"subtitle1"}>Repaved triggered by</Typography>
            <Typography variant={"subtitle2"}>
              {data.triggered_by || "-"}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GeneralDetails;
