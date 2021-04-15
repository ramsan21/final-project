import React, { useState } from "react";
import SelectField from "@material-ui/core/Select";
import { Box, FormControl, InputBase, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    label: {
        position: 'absolute',
        top: theme.spacing(-1),
        left: theme.spacing(1),
        zIndex: 1,
        backgroundColor: '#fafafa',
        padding: '0px 4px',
        color: theme.palette.primary.dark
    },
    select: {
        borderColor: theme.palette.primary.main + '!important',
        border: '1px solid',
        width: '100%',
        padding: theme.spacing(1.9),
        paddingRight: theme.spacing(4),
        borderRadius: `${theme.spacing(0.5)}px !important`,

    },
    InputBase: {
        padding: `${theme.spacing(0)}px !important`
    }
}));


const MultiSelect = ({ label, multiple, ...props }) => {

    const classes = useStyles();
    const [state, setState] = useState({
        values: []
    })

    const handleChange = (event, key, values) => {
        setState({ values: event.target.value });
    };

    const selectionRenderer = values => {
        // change the default comma separated rendering
        return (
            <span style={{ color: "#ff4081" }}>
                {values.join("; ")}
            </span>
        );
    };

    const { values } = state;

    return (
        <Box width="100%">
            <FormControl className={classes.formControl}>
                <InputLabel classes={{ root: classes.label }} className={classes.label} htmlFor="age-native-simple">{label}</InputLabel>
                <SelectField
                    classes={{
                        root: classes.select
                    }}
                    variant="outlined"
                    style={{ width: '100%', padding: 16, border: '' }}
                    multiple={multiple}
                    value={values}
                    onChange={handleChange}
                    input={<InputBase classes={{ root: classes.InputBase }} />}
                // selectionRenderer={selectionRenderer}
                >
                    {props.children}
                </SelectField>
            </FormControl>
        </Box>
    );
}

export default MultiSelect;