import React, { useEffect } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    selected: {
        backgroundColor: theme.palette.primary.light + ' !important'
    },
    listItemText: {
        color: theme.palette.common.white
    }
}))
function ListItemLink(props) {

    const classes = useStyles();
    const { to, open, menu, menuText, icon, ...other } = props;

    const selected = to === props.location.pathname;

    return (
        <ListItem classes={{
            selected: selected ? classes.selected : ''
        }} selected={selected} button component={RouterLink} to={to} {...other} >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={menuText} className={classes.listItemText} />
            {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
    );
}

ListItemLink.propTypes = {
    open: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

export default (ListItemLink);

