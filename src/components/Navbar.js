import React from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/routeConsts";

const Navbar = () => {
    const user = false
    return (
        <AppBar position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={"flex-end"}>
                    {user ?
                        <Button variant="outlined" color="inherit">Log out</Button>
                        :
                        <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                            <Button variant="outlined"  color="inherit">Log in</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
