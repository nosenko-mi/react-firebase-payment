import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Shop from "./Shop";
import Login from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Cart from "./Cart";
import CheckoutStripePage from "../pages/checkoutStripePage";
import SuccessPaymentPage from "../pages/successPaymentPage";
import CancelCheckoutPage from "../pages/cancelCheckoutPage";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
            <Routes>
                <Route key={"/shop"} path={"/shop"} element={<Shop />}/>
                <Route key={"/cart"} path={"/cart"} element={<Cart />}/>
                <Route key={"/history"} path={"/history"} element={<Cart />}/>
                <Route key={"/checkoutStripe"} path={"/checkoutStripe"} element={<CheckoutStripePage />}/>
                <Route key={"/success"} path={"/success"} element={<SuccessPaymentPage />}/>
                <Route key={"/cancel"} path={"/cancel"} element={<CancelCheckoutPage />}/>
                <Route key={"*"} path={"*"} element={<Navigate to="/shop"/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route key={"/shop"} path={"/shop"} element={<Shop />}/>
                <Route key={"/login"} path={"/login"} element={<Login />}/>
                <Route key={"/success"} path={"/success"} element={<SuccessPaymentPage />}/>
                <Route key={"/cancel"} path={"/cancel"} element={<CancelCheckoutPage />}/>
                <Route key={"/history"} path={"/history"} element={<Login />}/>
                <Route key={"/cart"} path={"/cart"} element={<Login />}/>
                <Route key={"*"} path={"*"} element={<Navigate to="/shop"/>}/>
            </Routes>
        )
};

export default AppRouter;