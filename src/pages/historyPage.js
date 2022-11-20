import React, {useContext, useEffect, useState} from 'react';
import baseUrl, {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Row from "../components/Row";
import Loader from "../components/Loader";

const HistoryPage = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const [rows, setRows] = useState([])

    // const [transactions, loading] = useCollectionData(
    //     firestore.collection("products")
    // )
    //
    // if (loading){
    //     return <Loader/>
    // }

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(baseUrl+"/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setRows(data)
            });

    }, []);

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                {rows.length > 0 ?
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Total price($)</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map((row) => (
                                        <Row key={row.paymentIntent.id} row={row} />
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>
                    :
                    <Loader/>
                }

            </Box>
        </Container>


    );
};

export default HistoryPage;