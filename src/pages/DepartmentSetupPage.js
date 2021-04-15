import { Box, Typography, Grid, Paper, Breadcrumbs, Link } from "@material-ui/core";
import React from "react";
import GeneralDetails from "../component/GeneralDetail";
import RepaveTimeline from "../component/RepaveTimeline";
import CustomizedTimeline from "../component/CustomizedTimeline";
import Logs from "../component/Logs";
import { makeStyles } from "@material-ui/core/styles";

export const DepartmentSetupPage = () => {
  const data = {
    dc_name: "dcname2000",
    domain_name: "Domain-1",
    forest_name: "NAME XYZ.COM",
    ad_site: "XX-YY-Z01",
    triggered_at: Date.now(),
    triggered_by: "E123456",
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const timelineData = [
    {
      task: "Repave Ready",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "Repave In progress",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "DC Demo in Progress",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "Repave Ready",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "Repave Ready",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "Repave Ready",
      tasktime: "30-03-2021 17:05:06 PM",
    },
    {
      task: "Repave Ready",
      tasktime: "30-03-2021 17:05:06 PM",
    },
  ];

  const classes = useStyles();
  return (
    <React.Fragment>
      <Box minHeight="100vh" pl={1}>

      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Cogent</Typography>
        <Link color="inherit" href="/dc-details" >
          Dep Setup Page
        </Link>  
      </Breadcrumbs>

        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            DC Details:
          </Typography>
          <GeneralDetails data={data} />
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            DC Repave Timeline:
          </Typography>
          <RepaveTimeline data={data} />
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            Logs:
          </Typography>
          <Logs data={data} />
        </Box>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom>
                DC Repave Timeline:
              </Typography>
              <Paper className={classes.paper}>
                <CustomizedTimeline data={timelineData} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom>
                Logs:
              </Typography>
              <Paper className={classes.paper}>
                <Logs data={data} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </React.Fragment>
  );
};
