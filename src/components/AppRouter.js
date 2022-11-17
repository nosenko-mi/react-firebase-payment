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
import HistoryPage from "../pages/historyPage";
import Register from "./Register";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
            <Routes>
                <Route key={"/shop"} path={"/shop"} element={<Shop />}/>
                <Route key={"/cart"} path={"/cart"} element={<Cart />}/>
                <Route key={"/history"} path={"/history"} element={<HistoryPage />}/>
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
                <Route key={"/register"} path={"/register"} element={<Register />}/>
                <Route key={"/success"} path={"/success"} element={<SuccessPaymentPage />}/>
                <Route key={"/cancel"} path={"/cancel"} element={<CancelCheckoutPage />}/>

                <Route key={"/history"} path={"/history"} element={<Login />}/>
                <Route key={"/cart"} path={"/cart"} element={<Login />}/>
                <Route key={"*"} path={"*"} element={<Navigate to="/shop"/>}/>
            </Routes>
        )
};

export default AppRouter;