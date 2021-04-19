import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box, MenuItem } from "@material-ui/core";
import { Check, Warning } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#fff',
        padding: theme.spacing(3),
        boxShadow: "0px 1px 4px #0000001A"
    },
    item: {
        display: 'flex',
        flexDirection: 'row ',
        alignItems: 'center',
    },
    tasktime: {
        position: 'absolute',
        right: theme.spacing(0),
        fontSize: theme.spacing(1.5),
        marginLeft: theme.spacing(1)
    }
}))

function GeneralDetails({ logs, data, ...props }) {

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container spacing={3} alignItems={"flex-start"}>
                {
                    logs && logs.length ? logs.map(log => <Box width="100%">
                        <MenuItem className={classes.item}>
                            {
                                log.status ? <Check fontSize="small" color="secondary" /> : <Warning fontSize="small" color="error" />
                            }
                            &nbsp;&nbsp;
                            <Typography color={log.status ? 'primary' : 'error'}>
                                {
                                    log.task
                                }

                            </Typography>
                            <span className={classes.tasktime}>{log.tasktime}</span>
                        </MenuItem>

                    </Box>)
                        :
                        'Logs can be seen here'
                }
            </Grid>
        </div>
    )
}

export default GeneralDetails;