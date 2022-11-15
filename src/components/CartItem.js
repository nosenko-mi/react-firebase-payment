import React from 'react';
import {Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {changeQuantity, removeItem} from "../redux/features/cart.feature";
import Dinero from "dinero.js";

const CartItem = (props) => {

    const {product} = props

    let dispatch = useDispatch()

    let price = Dinero({ amount: product.price, currency: "UAH" })
    let totalPrice = price.multiply(product.qty)

    price.toFormat('$0,0.0')
    totalPrice.toFormat('$0,0.0')

    // const cartState = useSelector((store)=>{
    //     return store["cart"]
    // })

    const removeFromCart = () => {
        dispatch(removeItem(product.id))
        // dispatch(removeItem({product}))
    }

    const increaseQty = () => {
        dispatch(changeQuantity({id: product.id, qty: product.qty + 1}))
    }

    const decreaseQty = () => {
        if (product.qty > 1){
            dispatch(changeQuantity({id: product.id, qty: product.qty - 1}))
        }
    }

    return (

        <Card sx={{ minWidth: 400,  minHeight: 100}}>
            <CardContent>
                <Grid
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                    </Typography>

                    <IconButton
                        onClick={removeFromCart}
                        aria-label="previous"
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>

                <Grid
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                >

                    <IconButton
                        onClick={decreaseQty}
                        aria-label="previous"
                    >
                        <RemoveIcon/>
                    </IconButton>

                    <Typography variant="caption" color="text.secondary">
                        {product.qty}
                    </Typography>

                    <IconButton
                        onClick={increaseQty}
                        aria-label="previous"
                    >
                        <AddIcon/>
                    </IconButton>
                </Grid>

                <Grid
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2" color="text.secondary">
                        Item price: {price.setLocale("uk-UA").toFormat('$0,0.00')}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
                    </Typography>
                </Grid>

            </CardContent>
        </Card>
    );
};

export default CartItem;