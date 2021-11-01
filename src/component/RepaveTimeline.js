import React from "react";
import crypto from "crypto";
import Grid from "@material-ui/core/Grid";
// import Timeline from "@material-ui/lab/Timeline";
// import TimelineItem from "@material-ui/lab/TimelineItem";
// import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
// import TimelineConnector from "@material-ui/lab/TimelineConnector";
// import TimelineContent from "@material-ui/lab/TimelineContent";
// import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { makeStyles } from "@material-ui/core/styles";
// import { Box, Paper, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

// import {
//   CheckCircleOutline,
//   PauseCircleFilled,
//   Cached,
//   Error,
//   CachedOutlined,
//   ErrorOutline,
//   CheckCircleOutlineRounded,
//   CheckCircleRounded,
// } from "@material-ui/icons";

import "./timeline.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    boxShadow: "0px 1px 4px #0000001A",
  },
  timeline: {
    transform: "rotate(-90deg)",
    [theme.breakpoints.down("sm")]: {
      transform: "rotate(0deg)",
    },
  },
  timelineContentContainer: {
    textAlign: "left",
  },
  timelineContent: {
    display: "inline-block",
    transform: "rotate(40deg)",
    textAlign: "center",
    minWidth: 50,
    padding: 10,
  },
  title: {
    // transform: "rotate(90deg)"
  },
  timelineIcon: {
    transform: "rotate(90deg)",
    [theme.breakpoints.down("md")]: {
      transform: "rotate(0deg)",
    },
    color: theme.palette.success.main,
  },
}));
const data = [
  {
    dc_name: "dcname2000",
    domain_name: "Domain-1",
    forest_name: "NAME XYZ.COM",
    ad_site: "XX-YY-Z01",
    triggered_at: Date.now(),
    triggered_by: "E123456",
  },
];
function GeneralDetails({ ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container spacing={3} alignItems={"flex-start"} justify={"center"}>
        <Grid item xs={12}>
          <Box py={4}>
            <div className="timeline">
              <div className="timeline-progress"></div>
              <div className="timeline-items">
                <div style={{ position: "relative", top: -5 }}>
                  <TimelineDot style={{ width: 15, height: 15 }} />
                  <span>Start</span>
                </div>
                {data.map((item) => (
                  <div
                    key={crypto.randomBytes(6).toString("hex")}
                    className={`timeline-item`}
                  >
                    <div className="timeline-content">{item.forest_name}</div>
                    <span>Time</span>
                  </div>
                ))}
                <div style={{ position: "relative", top: -5 }}>
                  <TimelineDot style={{ width: 15, height: 15 }} />
                  <span>End</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default GeneralDetails;
