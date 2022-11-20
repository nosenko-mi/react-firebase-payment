import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import ShopPage from "../pages/shopPage";
import Login from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Cart from "./Cart";
import CheckoutStripePage from "../pages/checkoutStripePage";
import SuccessPaymentPage from "../pages/successPaymentPage";
import CancelCheckoutPage from "../pages/cancelCheckoutPage";
import HistoryPage from "../pages/historyPage";
import Register from "./Register";
import {
    CART_ROUTE,
    HISTORY_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    SHOP_ROUTE,
    STRIPE_ROUTE,
    SUCCESS_ROUTE
} from "../utils/routeConsts";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
            <Routes>
                <Route key={"/shop"} path={SHOP_ROUTE} element={<ShopPage />}/>
                <Route key={"/cart"} path={CART_ROUTE} element={<Cart />}/>
                <Route key={"/history"} path={HISTORY_ROUTE} element={<HistoryPage />}/>
                <Route key={"/checkoutStripe"} path={STRIPE_ROUTE} element={<CheckoutStripePage />}/>
                <Route key={"/success"} path={SUCCESS_ROUTE} element={<SuccessPaymentPage />}/>
                <Route key={"/cancel"} path={"/cancel"} element={<CancelCheckoutPage />}/>
                <Route key={"*"} path={"*"} element={<Navigate to={SHOP_ROUTE}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route key={"/shop"} path={SHOP_ROUTE} element={<ShopPage />}/>
                <Route key={"/login"} path={LOGIN_ROUTE} element={<Login />}/>
                <Route key={"/register"} path={REGISTER_ROUTE} element={<Register />}/>
                <Route key={"/success"} path={SUCCESS_ROUTE} element={<SuccessPaymentPage />}/>
                <Route key={"/cart"} path={CART_ROUTE} element={<Login />}/>

                <Route key={"/cancel"} path={"/cancel"} element={<CancelCheckoutPage />}/>
                <Route key={"*"} path={"*"} element={<Navigate to={SHOP_ROUTE}/>}/>
            </Routes>
        )
};

export default AppRouter;