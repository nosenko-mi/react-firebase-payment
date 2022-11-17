import React, {useContext} from 'react';
import {AppBar, Button, Grid, Stack, Toolbar} from "@mui/material";
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
                    <Button size="small" variant="outlined"  color="inherit">Shop</Button>
                </NavLink>
                <Grid container justifyContent={"flex-end"}>
                    <Stack direction="row" spacing={1}>
                        <NavLink to={CART_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                            <Button size="small" variant="outlined"  color="inherit">Cart</Button>
                        </NavLink>

                        {user ?
                            <>
                                <NavLink to={HISTORY_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                                    <Button size="small" variant="outlined"  color="inherit">History</Button>
                                </NavLink>
                                <Button onClick={() => auth.signOut()} size="small" variant="outlined" color="inherit">Log out</Button>
                            </>
                            :
                            <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none", color: "inherit"}}>
                                <Button size="small" variant="outlined"  color="inherit">Log in</Button>
                            </NavLink>
                        }
                    </Stack>

                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
