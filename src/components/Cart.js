import React from 'react';
import {Box, Container, Grid, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import CartItem from "./CartItem";
import CheckoutCard from "./CheckoutCard";

const Cart = () => {

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
            <Grid display="flex" flexDirection="row" container  spacing={2} xs={12}>

                {/*<Grid*/}
                {/*    display="flex"*/}
                {/*    key="left"*/}
                {/*    container*/}
                {/*    xs={8}*/}
                {/*>*/}

                {/*    {cartItems.length > 0 ?*/}
                {/*        <Grid*/}
                {/*            key="left inner"*/}

                {/*        >*/}
                {/*            {cartItems.map(item =>(*/}
                {/*                <CartItem key={item.id} product={item}/>*/}
                {/*                ))}*/}
                {/*        </Grid>*/}
                {/*        :*/}
                {/*        <div>cart is empty</div>*/}
                {/*    }*/}

                {/*</Grid>*/}

                <Grid
                    key="right"
                    display="flex"
                    justifyContent="center"
                    item
                    xs={8}
                    sm={6}
                >
                    {cartItems.length > 0 ?
                        <Stack
                            spacing={2}
                            key="left inner"

                        >
                            {cartItems.map(item =>(
                                <CartItem key={item.id} product={item}/>
                            ))}
                        </Stack>
                        :
                        <div>cart is empty</div>
                    }
                </Grid>

                <Grid
                    key="right"
                    display="flex"
                    justifyContent="center"

                    item
                    xs={4}
                    sm={6}
                >
                    <CheckoutCard/>
                </Grid>
            </Grid>
        </Box>
    </Container>
    );
};

export default Cart;