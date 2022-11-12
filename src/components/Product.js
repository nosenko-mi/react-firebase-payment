import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const Product = ({name, description, price}) => {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {price} UAH
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">To cart</Button>
            </CardActions>
        </Card>
    );
};

export default Product;