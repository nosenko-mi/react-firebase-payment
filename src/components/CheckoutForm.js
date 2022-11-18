import React, {useContext, useEffect, useState} from "react";
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Box, Button} from "@mui/material";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Navigate, redirect, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

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


        // fetch("http://localhost:5000/react-firebase-payment/us-central1/api/retrieve-payment-intent", {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ clientSecret }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setClientSecret(data.clientSecret)
        //         setExtra(data.extra)
        //     });

        // const { error } = await stripe.confirmPayment({
        //     elements,
        //     confirmParams: {
        //         // Make sure to change this to your payment completion page
        //         // return_url: "http://localhost:3000",
        //         return_url: "http://localhost:3000/success",
        //
        //     }
        // });
        //
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        // if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        // } else {
        //     console.log(error.type)
        //     console.log(error)
        //     setMessage("An unexpected error occurred.");
        // }


        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: "http://localhost:3000",
                return_url: "http://localhost:3000/success",
            },
            redirect: "if_required"
        }).then()
            .catch((e) => {
            setMessage(e.message);
        });

        // when redirect: "if_required" you should manage redirect by yourself
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            console.log(error.type)
            console.log(error)
            setMessage("An unexpected error occurred.");
        }
        if (paymentIntent){
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    saveTransaction(paymentIntent).then()
                    navigate('/success')
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    saveTransaction(paymentIntent).then()
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

    // //    custom:
    //     const result = await stripe.updatePaymentIntent({
    //         elements,
    //         params: {
    //             payment_method_data: {
    //                 billing_details: {
    //                     email: user.email,
    //                     name: user.displayName
    //                 },
    //                 customer: user
    //             },
    //         }
    //     });
    //
    //     await stripePaymentMethodHandler(result);
    };

    const saveTransaction = async (intent) => {
        console.log(intent)

        const _transaction = {
            paymentIntent: intent,
            items: cartItems
        }
        //save transaction to firestore
        fetch('http://localhost:5000/react-firebase-payment/us-central1/api/save-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({transaction: _transaction})
        }).then();
    }

    const stripePaymentMethodHandler = async (result) => {
        if (result.error) {
            // Show error in payment form
        } else {
            // Otherwise send paymentIntent.id to your server
            const res = await fetch('http://localhost:5000/react-firebase-payment/us-central1/api/custom-payment-stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payment_intent_id: result.paymentIntent.id,
                })
            });

            const paymentResponse = await res.json();

            // Handle server response (see Step 7)
            await handleServerResponse(paymentResponse);
        }
    }

    const handleServerResponse = async (response) => {
        if (response.error) {
            // Show error from server on payment form
        } else if (response.requires_action) {
            // Use Stripe.js to handle the required next action
            const {
                error: errorAction,
                paymentIntent
            } = await stripe.handleNextAction({
                clientSecret: response.payment_intent_client_secret
            });


            if (errorAction) {
                // Show error from Stripe.js in payment form
                setMessage(errorAction.toString())
            } else {
                // Actions handled, show success message
                setMessage("Success")
            }
        } else {
            // No actions needed, show success message
            setMessage("Success")
        }
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