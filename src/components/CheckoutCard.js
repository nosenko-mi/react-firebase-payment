import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import Dinero from "dinero.js";
import {useNavigate} from "react-router-dom";
import {STRIPE_ROUTE} from "../utils/routeConsts";

const CheckoutCard = () => {

    const STRIPE_PAYMENT = "stripe"
    const LIQPAY_PAYMENT = "liqpay"
    const navigate = useNavigate();
    const [paymentType, setPaymentType] = useState(STRIPE_PAYMENT)
    const initTotalState =  Dinero({ amount: 0, currency: "UAH" }).multiply(1)
    // Dinero({ amount: 0, currency: "UAH" })
    const [totalPrice, setTotalPrice] = useState(initTotalState)

    // get the store data from redux
    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState

    const handlePaymentType = (event, newPaymentType) => {
        if (newPaymentType !== null) {
            setPaymentType(newPaymentType);
        }
    }

    useEffect(() => {

        let prices = cartItems.map((item) => (
            // item = { name: item.name, price: Dinero({ amount: item.price, currency: "UAH" }).multiply(item.qty)}
            Dinero({ amount: item.price, currency: "USD" }).multiply(item.qty)
        ))
        console.log(prices)

        setTotalPrice(
            prices.reduce((acc, object) => (
                acc.add(object)
            ), Dinero({ amount: 0, currency: "USD" }).multiply(1)
            )

        );
    }, [cartItems]);

    console.log("total")
    console.log(typeof totalPrice)
    console.log(totalPrice)

    const goToPayment = () => {
        console.log("toPayment")
        navigate(STRIPE_ROUTE)
    }

    return (
        <Card sx={{ minWidth: 200}}>
            <CardContent>

                <Stack spacing={4}>
                    <Typography gutterBottom variant="h5" component="div">
                        Checkout
                    </Typography>

                    {/*{cartItems.length > 0 ?*/}
                    {/*    <Stack key={cartItems.keys().next().value}>*/}
                    {/*        {cartItems.map(item =>(*/}
                    {/*            <Typography key={item.name} variant="caption" color="text.secondary">*/}
                    {/*                {item.name}: {item.price}*/}
                    {/*            </Typography>*/}

                    {/*            // <CartItem key={item.id} product={item}/>*/}
                    {/*        ))}*/}
                    {/*    </Stack>*/}
                    {/*    :*/}
                    {/*    <div>cart is empty</div>*/}
                    {/*}*/}

                    {cartItems.length > 0 ?
                        <Stack key="left inner">
                            <Typography variant="body1" color="text.secondary">
                                Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
                            </Typography>
                        </Stack>
                        :
                        <div>cart is empty</div>
                    }

                    <ToggleButtonGroup
                        value={paymentType}
                        onChange={handlePaymentType}
                        color="primary"
                        exclusive
                        aria-label="Platform"
                    >
                        <ToggleButton value={STRIPE_PAYMENT}>Stripe</ToggleButton>
                        <ToggleButton value={LIQPAY_PAYMENT}>LiqPay</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

            </CardContent>
            <CardActions
                disableSpacing
            >
                <Button
                    onClick={goToPayment}
                    fullWidth={true}
                    size="small"
                    variant="contained"
                    disabled={cartItems.length === 0}
                >
                    Pay
                </Button>
            </CardActions>
        </Card>
    );
};

export default CheckoutCard;