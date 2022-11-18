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
const baseUrl = 'https://us-central1-react-firebase-payment.cloudfunctions.net/api'
axios.defaults.baseURL = baseUrl;
export default baseUrl;

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
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
