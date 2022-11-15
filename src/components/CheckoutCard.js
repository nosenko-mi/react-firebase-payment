import React, {useState} from 'react';
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

const CheckoutCard = () => {

    const STRIPE_PAYMENT = "stripe"
    const LIQPAY_PAYMENT = "liqpay"
    const [paymentType, setPaymentType] = useState(STRIPE_PAYMENT)

    const handlePaymentType = (event, newPaymentType) => {
        if (newPaymentType !== null) {
            setPaymentType(newPaymentType);
        }
    }

    // get the store data from redux
    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState

    let prices = cartItems.map((item) => (
        item = { name: item.name, price: Dinero({ amount: item.price, currency: "UAH" }).multiply(item.qty)}
    ))

    console.log(prices)

    let totalPrice = prices.reduce((accumulator, object) => {
        return accumulator.price.add(object.price)
    })
    console.log(totalPrice)


    //
    // {cartItems.map(item =>(
    //     <Typography variant="caption" color="text.secondary">
    //         {item.name}: {item.price}
    //     </Typography>
    //
    //     // <CartItem key={item.id} product={item}/>
    // ))}

    return (
        <Card sx={{ minWidth: 200, minHeight: 300 }}>
            <CardContent>

                <Stack spacing={4}>
                    <Typography gutterBottom variant="h5" component="div">
                        Checkout
                    </Typography>


                    {cartItems.length > 0 ?
                        <Stack key="left inner">
                            {prices.map(item =>(
                                <Typography key={item.name} variant="caption" color="text.secondary">
                                    {item.name}: {item.price.setLocale("uk-UA").toFormat('$0,0.00')}
                                </Typography>

                                // <CartItem key={item.id} product={item}/>
                            ))}
                        </Stack>
                        :
                        <div>cart is empty</div>
                    }


                    {/*<Typography variant="caption" color="text.secondary">*/}
                    {/*    item: 12*/}
                    {/*</Typography>*/}

                    <Typography variant="body2" color="text.secondary">
                        Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
                    </Typography>

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
            <CardActions>
                <Button

                    onClick={() => {console.log("pay")}}
                    size="small"
                    variant="contained"
                >Pay</Button>
            </CardActions>
        </Card>
    );
};

export default CheckoutCard;