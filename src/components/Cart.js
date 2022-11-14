import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import CartItem from "./CartItem";
import CheckoutCard from "./CheckoutCard";

const Cart = () => {

    // const items = useSelector(state => state.cartItems)

    // get the store data from redux
    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    let {cartItems} = cartState

    return (
    <Container>
        <Box
            // sx={{ flexGrow: 1 }}
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        >
            <Grid display="flex" flexDirection="row" >

                <Grid display="flex" key="left" >

                    {cartItems.length > 0 ?
                        <Grid key="left inner">
                            {cartItems.map(item =>(
                                <CartItem key={item.id} product={item}/>
                                // TODO problem somewhere here:
                                // <CartItem key={item.product.id} product={item.product}/>
                                ))}
                        </Grid>
                        :
                        <div>cart is empty</div>
                    }
                </Grid>
                <Grid
                    key="right"
                    display="flex"
                >
                    <CheckoutCard/>
                </Grid>
            </Grid>
        </Box>
    </Container>
    );
};

export default Cart;