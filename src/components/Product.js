import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../redux/features/cart.feature";

const Product = (props) => {

    const {product} = props

    const dispatch = useDispatch()

    const cartState = useSelector((store)=>{
        return store["cart"]
    })
    console.log(cartState)

    //works locally
    const [isInCart, setInCart] = useState(cartState.cartItems.some(p => p.id === product.id))

    const handleClick = () => {
        //new
        setInCart(!isInCart)

        if (isInCart){
        //    remove from cart
            setInCart(!isInCart)

            console.log("remove")

            dispatch(removeItem(product.id))
        }
        else {
            console.log("add")
            setInCart(!isInCart)

            dispatch(addItem(product))
        }

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

                {
                    cartState.cartItems.some(p => p.id === product.id) ?
                        <Button
                            onClick={handleClick}
                            size="small"
                            variant="contained"
                            color="success"
                        >
                            In cart
                        </Button>
                    :
                        <Button
                            onClick={handleClick}
                            size="small"
                            variant="contained"
                            color="primary"
                        >
                            Add to cart
                        </Button>
                }



            </CardActions>
        </Card>
    );
};

export default Product;