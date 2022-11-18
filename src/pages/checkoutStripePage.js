import React, {useContext, useEffect, useState} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Box, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import Dinero from "dinero.js";
import baseUrl, {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

// Make sure to call loadStripe outside a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51M1ZzXAmva4q0cWXglLg3mdtR7dtF1qTjPhJdABWDqlmxJh1Q9utaE2qqS4URVw6tOBMDevZxGEaMAc4Onpn5mJf00OGi5PG54");


const CheckoutStripePage = () => {

    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState
    const initTotalState =  Dinero({ amount: 0, currency: "USD" }).multiply(1)
    const [totalPrice, setTotalPrice] = useState(initTotalState)

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [clientSecret, setClientSecret] = useState("");

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

        // axios.post('/create-payment-intent', { items: cartItems })
        //     .then((res) => console.log(res))
        //     .then((data) => setClientSecret(data.clientSecret))
        //     .catch(err => {
        //         console.error(err)
        //     })

        // Create PaymentIntent as soon as the page loads
        fetch(baseUrl+"/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems, customer: user }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });

    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                >
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
                        </Typography>
                        <Divider/>
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        )}
                        <Divider/>
                        <Typography variant="body2">
                            test card: 4242 4242 4242 4242
                        </Typography>
                    </Stack>
                </Grid>
            </Box>
        </Container>
    );
};

export default CheckoutStripePage;