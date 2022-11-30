import React, {useContext, useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../redux/features/cart.feature";
import {Context} from "../index";

const Product = (props) => {

    const {product} = props

    const{firebase} = useContext(Context)


    const dispatch = useDispatch()

    const cartState = useSelector((store)=>{
        return store["cart"]
    })
    console.log(cartState)

    //works locally
    const [isInCart, setInCart] = useState(cartState.cartItems.some(p => p.id === product.id))

    const [imageUrl, setImageUrl] = useState("")

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
    const storage = firebase.storage();
    const imgReference = storage.ref(`fake_products/${product.id}.webp`);
    imgReference.getDownloadURL()
        .then((url) => {
            setImageUrl(url)
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <Card sx={{ minHeight:300, maxWidth: 300}}>
            <CardContent>
                <CardMedia
                    component="img"
                    height="140"
                    // image={imgUrl.toString()}
                    src={imageUrl}
                    alt={product.name}
                />
                <Typography  variant="h5" component="div">
                    {product.name}
                </Typography>

                <Typography gutterBottom variant="caption" color="text.secondary">
                    {product.description}
                </Typography>

                <Typography variant="h6" color="text.secondary">
                    {product.price/100} {product.currency}
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
                            fullWidth={true}
                        >
                            In cart
                        </Button>
                        :
                        <Button
                            onClick={handleClick}
                            size="small"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                        >
                            Add to cart
                        </Button>
                }
            </CardActions>
        </Card>
    );
};

export default Product;