import React, {useContext, useState} from 'react';
import {Box, Card, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {changeQuantity, removeItem} from "../redux/features/cart.feature";
import Dinero from "dinero.js";
import {Context} from "../index";

const CartItem = (props) => {

    const {product} = props
    const{firebase} = useContext(Context)

    const [imageUrl, setImageUrl] = useState("")

    let dispatch = useDispatch()

    let price = Dinero({ amount: product.price, currency: "USD" })
    let totalPrice = price.multiply(product.qty)

    price.toFormat('$0,0.0')
    totalPrice.toFormat('$0,0.0')

    // const cartState = useSelector((store)=>{
    //     return store["cart"]
    // })

    const removeFromCart = () => {
        dispatch(removeItem(product.id))
        // dispatch(removeItem({product}))
    }

    const increaseQty = () => {
        dispatch(changeQuantity({id: product.id, qty: product.qty + 1}))
    }

    const decreaseQty = () => {
        if (product.qty > 1){
            dispatch(changeQuantity({id: product.id, qty: product.qty - 1}))
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

        // <Card sx={{ minWidth: 400,  minHeight: 100}}>
        //     <CardContent>
        //         <Grid
        //             display="flex"
        //             flexDirection="row"
        //             alignItems="center"
        //             justifyContent="space-between"
        //         >
        //
        //             <Typography gutterBottom variant="h6" component="div">
        //                 {product.name}
        //             </Typography>
        //
        //             <IconButton
        //                 onClick={removeFromCart}
        //                 aria-label="previous"
        //             >
        //                 <CloseIcon />
        //             </IconButton>
        //         </Grid>
        //
        //         <Grid
        //             display="flex"
        //             flexDirection="row"
        //             alignItems="center"
        //         >
        //
        //             <IconButton
        //                 onClick={decreaseQty}
        //                 aria-label="previous"
        //             >
        //                 <RemoveIcon/>
        //             </IconButton>
        //
        //             <Typography variant="caption" color="text.secondary">
        //                 {product.qty}
        //             </Typography>
        //
        //             <IconButton
        //                 onClick={increaseQty}
        //                 aria-label="previous"
        //             >
        //                 <AddIcon/>
        //             </IconButton>
        //         </Grid>
        //
        //         <Grid
        //             display="flex"
        //             flexDirection="row"
        //             alignItems="center"
        //             justifyContent="space-between"
        //         >
        //             <Typography variant="body2" color="text.secondary">
        //                 Item price: {price.setLocale("uk-UA").toFormat('$0,0.00')}
        //             </Typography>
        //
        //             <Typography variant="body2" color="text.secondary">
        //                 Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
        //             </Typography>
        //         </Grid>
        //
        //     </CardContent>
        // </Card>
        <Card sx={{ minWidth: 400,  minHeight: 100, display: "flex", mb: 2}}>
            <CardMedia
                sx={{ objectFit: "contain", width: 160 }}
                component="img"
                height="160"
                image={imageUrl}
                alt={product.name}
            />
            <Box display="flex" flexDirection="column" flexGrow={1} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Grid
                        display="flex"
                        flexDirection="row"
                        fle
                        alignItems="center"
                        justifyContent="space-between"
                        item
                        xs={12}
                        container
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

                        <IconButton
                            onClick={decreaseQty}
                            aria-label="previous"
                        >
                            <RemoveIcon/>
                        </IconButton>

                        <Typography variant="caption" color="text.secondary">
                            {product.qty}
                        </Typography>

                        <IconButton
                            onClick={increaseQty}
                            aria-label="previous"
                        >
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
                            Item price: {price.setLocale("uk-UA").toFormat('$0,0.00')}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Total: {totalPrice.setLocale("uk-UA").toFormat('$0,0.00')}
                        </Typography>
                    </Grid>

                </CardContent>
            </Box>
        </Card>
    );
};

export default CartItem;