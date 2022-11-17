import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {CART_ROUTE, HISTORY_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/routeConsts";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <AppBar position="static">
            <Toolbar variant={"dense"}>
                <NavLink to={SHOP_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                    <Button variant="outlined"  color="inherit">Shop</Button>
                </NavLink>
                <Grid container justifyContent={"flex-end"}>
                    <NavLink to={CART_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                        <Button variant="outlined"  color="inherit">Cart</Button>
                    </NavLink>
                    <NavLink to={HISTORY_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                        <Button variant="outlined"  color="inherit">History</Button>
                    </NavLink>
                    {user ?
                        <Button onClick={() => auth.signOut()} variant="outlined" color="inherit">Log out</Button>
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
