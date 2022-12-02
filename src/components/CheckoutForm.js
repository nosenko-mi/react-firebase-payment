import React, {useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Box, Button} from "@mui/material";
import baseUrl from "../index";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../redux/features/cart.feature";
import {SUCCESS_ROUTE} from "../utils/routeConsts";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState
    let dispatch = useDispatch()

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked")

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            console.log("Stripe.js has not yet loaded.")
            return;
        }

        setIsLoading(true);

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: "http://localhost:3000",
                return_url: "http://localhost:3000/success",
            },
            redirect: "if_required"
        });

        // when redirect: "if_required" you should manage redirect by yourself
        //TODO refactor this
        if (error) {
            // Handle error here
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                console.log(error.type)
                console.log(error)
                setMessage("An unexpected error occurred.");
            }
        } else if (paymentIntent) {
            // Handle successful payment here
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    saveTransaction(paymentIntent).then()
                    dispatch(clearCart())
                    navigate(SUCCESS_ROUTE)
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    saveTransaction(paymentIntent).then()
                    dispatch(clearCart())
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        }

        setIsLoading(false);
    };

    const saveTransaction = async (intent) => {
        console.log(intent)

        const _transaction = {
            paymentIntent: intent,
            items: cartItems
        }
        //save transaction to firestore
        fetch(baseUrl + '/save-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({transaction: _transaction})
        }).then();
    }


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Box
                mt={1}
            >
                <Button
                    fullWidth={true}
                    size="small"
                    variant="contained"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    type="submit"
                >
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
                </Button>
            </Box>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}