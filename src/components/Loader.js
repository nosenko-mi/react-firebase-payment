import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Loader = () => {
    return (
        <Box
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;