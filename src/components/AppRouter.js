import React from 'react';
import {Route, Routes} from "react-router-dom";
import Shop from "./Shop";
import Login from "./Login";

const AppRouter = () => {
    const user = false
    return user ?
        (
            <Routes>
                <Route path={"/shop"} element={<Shop />}/>
                <Route path={"*"} element={<Shop />}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"*"} element={<Login />}/>
            </Routes>
        )
};

export default AppRouter;