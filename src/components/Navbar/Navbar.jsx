import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/KingAJ-2.png'
import useStyles from './styles';

const Navbar = ({totalItems}) => {
    const location = useLocation();
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Anele's Store" height="25px" className={classes.image}/>
                        Anele's Store
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname == '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div> ) }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
