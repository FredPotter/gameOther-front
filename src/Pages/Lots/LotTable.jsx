import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LotTable({ offers }) {
    const [order, setOrder] = React.useState('asc');

    const handleSort = () => {
        setOrder(order === 'asc' ? 'desc' : 'asc');
        offers.sort((a, b) => (a.pricePerLot < b.pricePerLot ? -1 : 1) * (order === 'asc' ? 1 : -1));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell>
                            <TableSortLabel active direction={order} onClick={handleSort}>
                                Price per Lot
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Obtain Method</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {offers.map((offer) => (
                        <TableRow key={offer.id} component={Link} to={`/lots/offer?id=${offer.id}`} hover style={{ textDecoration: 'none' }}>
                            <TableCell>{offer.name}</TableCell>
                            <TableCell>{offer.category.name}</TableCell>
                            <TableCell>{offer.seller.username}</TableCell>
                            <TableCell>{offer.pricePerLot}</TableCell>
                            <TableCell>{offer.obtainMethod}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}