import React, {useContext} from 'react';
import {Navigate, NavLink} from "react-router-dom";
import {Box, Button, Container, Grid, Stack, TextField, Typography} from "@mui/material";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

const Register = () => {

    console.log(process.env.REACT_APP_FIREBASE_KEY)
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)

    if (user) {
        return <Navigate to="/" />;
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        const { name, email, password } = e.target.elements;
        console.log(name.value)

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                updateProfile(user, {displayName: name.value})
                    .then(() => {
                        console.log("profile updated")
                    })
                    .catch(e => {
                        console.log(e)
                    })

                saveUser({uid: user.uid, displayName: name.value, email: user.email}).then()

            })
            .catch((error) => {
                console.log(error.message)
                alert(error.message)
            });
    }

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

    if (user) {
        return <Navigate to="/" />;
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
                            <form onSubmit={handleSignUp}>
                                <Stack spacing={1}>

                                    <TextField  required id="name" label="Full name" type="text" placeholder="Name" />

                                    <TextField  required id="email" label="Email" type="email" placeholder="Email" />

                                    <TextField  required id="password" label="Password" type="password" placeholder="Password" />

                                    <TextField  required id="confirm-password" label="Confirm password" type="password" placeholder="ConfirmPassword" />

                                    <Button type="submit">Register</Button>
                                </Stack>
                            </form>
                            <Typography variant="body2">Already have an account? <NavLink to="/login">Sign in</NavLink> </Typography>
                        </Stack>

                    </Box>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;