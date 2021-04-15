import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const MROButton = withStyles(theme => ({
    root: {
        fontWeight: 500,
        textTransform: 'none',
        fontSize: 14,
        borderRadius: theme.spacing(0.5),
        '&:hover, &:active': {
            borderColor: theme.palette.primary.dark,
            boxShadow: 'none',
        },
    }
}))((props) => <Button type={"button"} disableElevation disableRipple disableFocusRipple {...props} />);

export default MROButton;