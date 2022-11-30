import React from 'react';
import {Box, Container, Typography} from "@mui/material";

const SuccessPaymentPage = () => {
    return (

        <Container>
            <Box
                // sx={{ flexGrow: 1 }}
                flexGrow="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
                py={20}
            >
                <Typography variant="h4">
                    Success!
                </Typography>
            </Box>
        </Container>

    );
};

export default SuccessPaymentPage;