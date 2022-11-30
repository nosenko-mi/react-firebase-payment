import React, {useContext} from 'react';
import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Box, Container, Grid} from "@mui/material";
import Product from "../components/Product";
import Loader from "../components/Loader";

const ShopPage = () => {

    const{firestore} = useContext(Context)

    const [products, loading] = useCollectionData(
        firestore.collection("fake_products")
    )

    if (loading){
        return <Loader/>
    }

    return (
        <Container>
            <Box
                // sx={{ flexGrow: 1 }}
                flexGrow="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
                py={20}
            >
                <Grid
                    container
                    spacing={2}
                    display="flex"
                    direction="row"
                    alignItems="stretch"
                    // alignItems="stretch"

                    justifyContent="center"
                    xs={12}
                >
                    {products.map(p => (
                        <Grid key={p.id}
                              item xs={4}
                              display="flex"

                              alignItems="center"
                              justifyContent="center">
                            <Product key={p.id} product={p}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default ShopPage;