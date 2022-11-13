import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const Product = (props) => {

    const {product} = props

    const addToCart = () => {
        console.log("added")
    }

    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {product.description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {product.price} UAH
                </Typography>

            </CardContent>
            <CardActions>
                <Button onClick={addToCart} size="small">To cart</Button>
            </CardActions>
        </Card>
    );
};

export default Product;