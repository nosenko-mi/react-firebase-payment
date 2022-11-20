import {LOGIN_ROUTE, SHOP_ROUTE} from "./utils/routeConsts";
import Login from "./components/Login";
import ShopPage from "./pages/shopPage";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    }
]

export const privateRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <ShopPage/>
    }
]