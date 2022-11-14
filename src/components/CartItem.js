import React from 'react';
import {Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {removeItem} from "../redux/features/cart.feature";

const CartItem = (props) => {

    const {product} = props

    let dispatch = useDispatch()

    const removeFromCart = () => {
        dispatch(removeItem(product.id))
        // dispatch(removeItem({product}))
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

                    <IconButton aria-label="previous">
                        <RemoveIcon/>
                    </IconButton>

                    <Typography variant="caption" color="text.secondary">
                        amount
                    </Typography>

                    <IconButton aria-label="previous">
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
                        Item price: {product.price} UAH
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Total: {product.price} UAH
                    </Typography>
                </Grid>

                {/*<Stack direction="row" spacing={1} >*/}

                {/*    <IconButton aria-label="previous">*/}
                {/*        <RemoveIcon/>*/}
                {/*    </IconButton>*/}

                {/*    <Typography variant="caption" color="text.secondary">*/}
                {/*        amount*/}
                {/*    </Typography>*/}

                {/*    <IconButton aria-label="previous">*/}
                {/*        <AddIcon/>*/}
                {/*    </IconButton>*/}
                {/*</Stack>*/}

                {/*<Stack direction="row" spacing={2}>*/}
                {/*    <Typography variant="body2" color="text.secondary">*/}
                {/*        Item price: {product.price} UAH*/}
                {/*    </Typography>*/}

                {/*    <Typography variant="body2" color="text.secondary">*/}
                {/*        Total: {product.price} UAH*/}
                {/*    </Typography>*/}
                {/*</Stack>*/}



            </CardContent>
        </Card>
    );
};

export default CartItem;