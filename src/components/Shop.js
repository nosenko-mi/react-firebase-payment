import React, {useContext} from 'react';
import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";

const Shop = () => {

    // const{auth, firestore} = useContext(Context)
    // const [message, loading] = useCollectionData(
    //     firestore.collection("products").orderBy("name")
    // )
    //
    // if (loading){
    //     return <Loader/>
    // }

    return (
        <div>
            Shop
        </div>
    );
};

export default Shop;