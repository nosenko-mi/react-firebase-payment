import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../redux/features/cart.feature";

const Product = (props) => {

    const {product} = props

    const dispatch = useDispatch()
    // const cartItems = useSelector(state => state.cartItems)

    const cartState = useSelector((store)=>{
        return store["cart"]
    })
    console.log(cartState)
    // let {cart} = cartState

    //works locally
    const [isInCart, setInCart] = useState(cartState.cartItems.some(p => p.id === product.id))

    const handleClick = () => {
        // dispatch(addItem(product))
        // console.log("added")

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

            // dispatch(addItem({
            //     id: product.id,
            //     price: product.price,
            //     amount: product.amount,
            //     name: product.name,
            //     description: product.description,
            //     version: product.version,
            //     active: product.active,
            //     inCart: isInCart,
            //     qty: 1
            // }))
        }

        // useless
        // dispatch(addItem({product, quantity}))
    }

    // useEffect(() => {
    //     console.log(" effect " + isInCart.toString())
    //
    //     if (isInCart){
    //         dispatch(removeItem(product.id))
    //     }
    //     else {
    //         dispatch(addItem({
    //             id: product.id,
    //             price: product.price,
    //             amount: product.amount,
    //             name: product.name,
    //             description: product.description,
    //             version: product.version,
    //             active: product.active,
    //             inCart: isInCart
    //         }))
    //     }
    // }, [isInCart])



    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {product.description}
                </Typography>

                {/*<Grid*/}
                {/*    display="flex"*/}
                {/*    flexDirection="row"*/}
                {/*    alignItems="center"*/}
                {/*>*/}
                {/*    <IconButton onClick={decItem} aria-label="previous">*/}
                {/*        <RemoveIcon/>*/}
                {/*    </IconButton>*/}

                {/*    <Typography variant="caption" color="text.secondary">*/}
                {/*        {quantity}*/}
                {/*    </Typography>*/}

                {/*    <IconButton onClick={incItem} aria-label="previous">*/}
                {/*        <AddIcon/>*/}
                {/*    </IconButton>*/}
                {/*</Grid>*/}

                <Typography variant="body2" color="text.secondary">
                    {product.price} UAH
                </Typography>

            </CardContent>
            <CardActions>
                {/*<Button*/}
                {/*    onClick={handleClick}*/}
                {/*    size="small"*/}
                {/*    variant="contained"*/}
                {/*    color={isInCart ? "success" : "primary"}*/}
                {/*>*/}
                {/*    /!*{isInCart ? "In cart" : "Add to cart"}*!/*/}

                {/*    {cartState.cartItems.some(p => p.id === product.id) ?*/}
                {/*        "In cart"*/}
                {/*        :*/}
                {/*        "Add to cart"*/}
                {/*    }*/}
                {/*</Button>*/}


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