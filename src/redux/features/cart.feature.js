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

            // return {...state, cartItems: [...state.cartItems, action.payload]}

            // TODO check if item with id does already exist


            return {...state, cartItems: [...state.cartItems, action.payload]}

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