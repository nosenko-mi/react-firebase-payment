import React from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import "firebase/firestore"

const Login = () => {

    // const {auth} = useContext(Context)
    //
    const login = async () => {
        // const provider = new firebase.auth.GoogleAuthProvider()
        // const {user} = await auth.signInWithPopup(provider)
        // console.log(user)

        console.log("clicked")
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