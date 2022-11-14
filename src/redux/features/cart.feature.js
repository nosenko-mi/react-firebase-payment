import {createSlice} from "@reduxjs/toolkit";

const defaultState ={
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem : function (state, action){
            // state.cartItems = {...state.cartItems, cartItems: [...state.cartItems, action.payload]} state.cartItems in not iterable!

            // before todo
            // return {...state, cartItems: [...state.cartItems, action.payload]}
            return {...state, cartItems: [...state.cartItems, {...action.payload, qty: 1}]}

            // TODO check if item with id does already exist
            // const item = action.payload;
            // const product = state.cartItems.find(x => x.product === item.product);
            // if (product) {
            //     return {
            //         cartItems:
            //             state.cartItems.map(x => x.product === product.product ? item : x)
            //     };
            // }
            // return { cartItems: [...state.cartItems, item] };

        },
        removeItem: function (state, action){
            // state.cartItems = {...state.cartItems, cartItems: state.cartItems.filter(item => item.id !== action.payload)}
            // return {...state, cartItems: [state.cartItems.filter(item => item.id !== action.payload)]}
            return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload)}
        }
    }
})

export const {addItem, removeItem} = cartSlice.actions
export default cartSlice.reducer