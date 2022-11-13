import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Shop from "./Shop";
import Login from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Cart from "./Cart";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
            <Routes>
                <Route key={"/shop"} path={"/shop"} element={<Shop />}/>
                <Route key={"/cart"} path={"/cart"} element={<Cart />}/>
                <Route key={"*"} path={"*"} element={<Navigate to="/shop"/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route key={"/shop"} path={"/shop"} element={<Shop />}/>
                <Route key={"/login"} path={"/login"} element={<Login />}/>
                <Route key={"*"} path={"*"} element={<Navigate to="/shop"/>}/>
            </Routes>
        )
};

export default AppRouter;