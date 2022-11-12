import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const Product = ({name, description, price}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {description}
                </Typography>.
                <Typography variant="body2" color="text.secondary">
                    {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">To cart</Button>
            </CardActions>
        </Card>
    );
};

export default Product;