import React, {useContext, useState} from 'react';
import {Box, Button, Container, Grid, Stack, TextField, Typography} from "@mui/material";
import "firebase/firestore"
import {Context} from "../index";
import firebase from "firebase/compat/app";
import {useAuthState} from "react-firebase-hooks/auth";
import {Navigate, NavLink} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    if (user) {
        return <Navigate to="/" />;
    }

    const signInGoogle = async () => {

        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const {user} = await auth.signInWithPopup(provider)
            await saveUser(user)
            console.log(user)
        } catch (e){
            console.log(e);
        }
    }

    const signInEmailPassword = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    //TODO create User, UserRepository
    const saveUser = async (_user) => {
        firestore.collection("users").doc(_user.email).set({
            uid: _user.uid,
            displayName: _user.displayName,
            email: _user.email
        }, {merge: true})
            .then(() => {
                console.log("Document successfully written!")
            })
            .catch(e => {
            console.log(e)})
    }

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                <Grid style={{width:400}}
                      container
                      alignItems="center"
                      justifyContent="center"
                >
                    <Box textAlign="center">
                        <Stack spacing={3}>

                            <Stack spacing={1}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                }} />

                                <TextField   id="password" label="Password" type="password" placeholder="Password"           onChange={(event) => {
                                    setLoginPassword(event.target.value);
                                }}/>

                                <Button onClick={signInEmailPassword}>Log in</Button>
                            </Stack>

                            <Typography variant="body2">Don't have an account? <NavLink to="/register">Create one</NavLink> </Typography>
                            <Typography variant="body2">or</Typography>
                            <Button onClick={signInGoogle} variant={"contained"}>Sign in with Google</Button>
                        </Stack>

                    </Box>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;

// TODO login page template
// https://github.com/mui/material-ui/blob/v5.10.13/docs/data/material/getting-started/templates/sign-in/SignIn.js