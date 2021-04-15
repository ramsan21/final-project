import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  PlayArrow,
  CheckCircleOutline,
  Stop,
  DoneOutline,
  Error
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const timelineData = [
  {
    task: "Repave Ready",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Repave In progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "DC Demo In Progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Repave Completed",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "OSRE Pave In progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "OSRE Pave Completed",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Repave Ready",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Pave In Progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "DC Promo In progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Post Promo In progress",
    tasktime: "30-03-2021 17:05:06 PM",
  },
  {
    task: "Pave Completed",
    tasktime: "30-03-2021 17:05:06 PM",
  },
];

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent />
        <TimelineSeparator>
          <TimelineDot style={{ color: "#fff", backgroundColor: "#1B5E20" }}>
            <PlayArrow />
          </TimelineDot>
          <TimelineConnector style={{ backgroundColor: "#FF6D00" }} />
        </TimelineSeparator>
        <TimelineContent></TimelineContent>
      </TimelineItem>
      {timelineData.map((item, index) => (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {item.tasktime}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ color: "#00C853", backgroundColor: "#fff" }}>
              <DoneOutline />
            </TimelineDot>
            <TimelineConnector style={{ backgroundColor: "#FF6D00" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Step {index + 1}
              </Typography>
              <Typography>{item.task}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={{ color: "#fff", backgroundColor: "#D50000" }}>
            <Stop />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent />
      </TimelineItem>
    </Timeline>
  );
}
