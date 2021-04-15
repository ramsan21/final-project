import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#fff',
        padding: theme.spacing(3),
        boxShadow: "0px 1px 4px #0000001A"
    }
}))

function GeneralDetails({ data, ...props }) {

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container spacing={3} alignItems={"flex-start"}>
                Logs can be seen here
            </Grid>
        </div>
    )
}

export default GeneralDetails;