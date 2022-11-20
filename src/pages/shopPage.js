import React, {useContext} from 'react';
import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Box, Container, Grid} from "@mui/material";
import Product from "../components/Product";
import Loader from "../components/Loader";

const ShopPage = () => {

    const{firestore} = useContext(Context)

    const [products, loading] = useCollectionData(
        firestore.collection("products")
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
            >
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

export default ShopPage;