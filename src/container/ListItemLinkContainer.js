import React, { PureComponent } from 'react';
import ListItemLink from '../component/ListItemLink';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { useStyles } from '../static/MiniDrawerStyles';

const classes = useStyles;

class ListItemLinkContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

    }

    handleClick = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { menuobj } = this.props;

        return (
            <React.Fragment>
                {menuobj.submenu.length > 0 ?
                    (
                        <ListItemLink
                            {...this.props}
                            key={menuobj.id}
                            to={menuobj.path}
                            menuText={menuobj.menuName}
                            icon={menuobj.icon}
                            open={this.state.isOpen}
                            onClick={this.handleClick} />
                    )
                    :
                    (
                        <ListItemLink
                            {...this.props}
                            key={menuobj.id}
                            to={menuobj.path}
                            menuText={menuobj.menuName}
                            icon={menuobj.icon} />
                    )
                }

                <Collapse component="li" in={this.state.isOpen} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {menuobj.submenu.map((sub, index) => (
                            <ListItemLink
                                {...this.props}
                                key={sub.id}
                                to={sub.path}
                                menuText={sub.menuName}
                                icon={sub.icon}
                                className={classes.nested} />
                        ))}
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }

}

export default ListItemLinkContainer;