import React from 'react';
import {Box, Container, Grid} from "@mui/material";
// import styles from 'src/styles/Loader.module.css';
import './Loader.css';

const Loader = () => {
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
                    <div className="ldsRing">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Grid>
            </Box>
        </Container>
    );
};

export default Loader;