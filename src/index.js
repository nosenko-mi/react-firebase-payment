import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore";
import "firebase/compat/auth"
import {Provider} from "react-redux";
import store from "./redux/store";
import axios from "axios";

// axios.defaults.baseURL = 'https://us-central1-react-firebase-payment.cloudfunctions.net/api';
axios.defaults.baseURL = 'http://localhost:5000/react-firebase-payment/us-central1/api';

// const defaultState ={
//     cartItems: []
// }
//
// const cartReducer = (state = defaultState, action) => {
//     switch (action.type){
//         case "ADD_PRODUCT":
//             return {...state, cartItems: [...state.cartItems, action.payload]}
//         case "REMOVE_PRODUCT":
//             return
//         default:
//             return state
//     }
// }
//
// const store = configureStore({
//     reducer: cartReducer
// })

firebase.initializeApp({
    apiKey: "AIzaSyDW7QOd2R7oz9_DAt88IAhGCZE6PlDGmzM",
    authDomain: "react-firebase-payment.firebaseapp.com",
    projectId: "react-firebase-payment",
    storageBucket: "react-firebase-payment.appspot.com",
    messagingSenderId: "824400707925",
    appId: "1:824400707925:web:ddd359e66526ef088f6fdc",
    measurementId: "G-LHQSKQXP8K"
});



export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </Context.Provider>
);
