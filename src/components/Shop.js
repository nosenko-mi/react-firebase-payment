import React, {useContext} from 'react';
import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Box, Container, Grid} from "@mui/material";
import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../redux/features/cart.feature";
import Loader from "./Loader";

const Shop = () => {

    let dispatch = useDispatch()
    // const cartItems = useSelector(state => state.cartItems)

    let cartState = useSelector((store)=>{
        return store["cart"]
    })
    // let {cart} = cartState

    const addProductToCart = (id) => {
        dispatch(addItem(id))
    }

    const{auth, firestore} = useContext(Context)

    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )

    if (loading){
        return <Loader/>
    }

    return (
        // <Container>
        //     <Box
        //         display="flex"
        //         justifyContent="center"
        //         alignItems="center"
        //         flexDirection="row"
        //         minHeight="90vh"
        //     >
        //         <Stack direction="row" spacing={2}>
        //             {products.map(p =>
        //                 <Product key={p.name} name={p.name} description={p.description} price={p.price}/>
        //             )}
        //         </Stack>
        //
        //     </Box>
        // </Container>

        <Container>
            <Box
                // sx={{ flexGrow: 1 }}
                flexGrow="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                {/*<Grid container justifyContent="center" spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>*/}
                {/*    {products.map(p => (*/}
                {/*        <Grid item xs={2} sm={4} md={4} key={p}>*/}
                {/*            <Product key={p.name} name={p.name} description={p.description} price={p.price}/>*/}
                {/*        </Grid>*/}
                {/*    ))}*/}
                {/*</Grid>*/}

                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {products.map(p => (
                        <Grid key={p.id} item xs={3}>
                            <Product key={p.id} product={p}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Shop;