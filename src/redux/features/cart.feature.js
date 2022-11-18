import {createSlice} from "@reduxjs/toolkit";

const defaultState ={
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem : function (state, action){
            return {...state, cartItems: [...state.cartItems, {...action.payload, qty: 1}]}
        },
        removeItem: function (state, action){
            return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload)}
        },
        changeQuantity: function (state, action){
            state.cartItems.filter((item) =>
                item.id === action.payload.id ?
                    (item.qty = action.payload.qty)
                    :
                    (item.qty)
            )
        },
        clearCart: function (state, action){
            return {...state, cartItems: []}
        }
    }
})

export const {addItem, removeItem, changeQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer