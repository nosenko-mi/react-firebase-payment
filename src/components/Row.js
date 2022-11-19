import React from 'react';
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DineroFormatter from "../utils/dineroFormatter";

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const date = new Date(row.createdAt._seconds*1000 + row.createdAt._nanoseconds/100000)
    console.log(date)

    const totalPrice = DineroFormatter.formatAmount(row.paymentIntent.amount)

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>{date.toDateString()}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{totalPrice}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price($)</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>

                                            <TableCell align="right">
                                                {DineroFormatter.formatAmount(item.price)}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.qty}
                                            </TableCell>

                                            <TableCell align="right">
                                                {/*{Math.round(item.qty * item.price * 100) / 100}*/}
                                                {DineroFormatter.formatAmount(item.price * item.qty)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Row;