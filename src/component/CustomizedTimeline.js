import React, { useState, useContext } from "react";
import crypto from "crypto";
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

import { PlayArrow, Stop, DoneOutline, Error } from "@material-ui/icons";
import ConfirmAlertDialog from "./Universal/confirm-alert-dialog";
import { ToastMessageContext } from "../lib/contexts/message.context";

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
    status: true,
  },
  {
    task: "Repave In progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: false,
  },
  {
    task: "DC Demo In Progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "Repave Completed",
    tasktime: "30-03-2021 17:05:06 PM",
    status: false,
  },
  {
    task: "OSRE Pave In progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "OSRE Pave Completed",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "Repave Ready",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "Pave In Progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: false,
  },
  {
    task: "DC Promo In progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "Post Promo In progress",
    tasktime: "30-03-2021 17:05:06 PM",
    status: true,
  },
  {
    task: "Pave Failure",
    tasktime: "30-03-2021 17:05:06 PM",
    status: false,
  },
];

export default function CustomizedTimeline({ setLogs, logs }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState({});
  const message = useContext(ToastMessageContext);

  const handleClick = (item) => () => {
    setItem(item);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    if (!item.status) setLogs([...logs, item]);
    else message.showToastMessage({ message: item.task, variant: "success" });
    handleClose();
  };

  return (
    <React.Fragment>
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
          <TimelineItem
            key={crypto.randomBytes(6).toString("hex")}
            onClick={handleClick(item)}
          >
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {item.tasktime}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  color: item.status ? "#00C853" : "#D50000",
                  backgroundColor: "#fff",
                }}
              >
                {item.status ? <DoneOutline /> : <Error />}
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
      <ConfirmAlertDialog
        open={openDialog}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}
