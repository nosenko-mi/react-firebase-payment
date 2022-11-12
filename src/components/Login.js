import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import "firebase/firestore"
import {Context} from "../index";
import firebase from "firebase/compat/app";

const Login = () => {

    const {auth, firestore} = useContext(Context)
    // const [user] = useAuthState(auth)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        await saveUser(user)
        console.log(user)
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
                <Grid style={{width:400, background: 'lightgray'}}
                      container
                      alignItems="center"
                      justifyContent="center"
                >
                    <Box p={5}>
                        <Button onClick={login} variant={"contained"}>Sign in with Google</Button>
                    </Box>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;

// TODO login page template
// https://github.com/mui/material-ui/blob/v5.10.13/docs/data/material/getting-started/templates/sign-in/SignIn.js