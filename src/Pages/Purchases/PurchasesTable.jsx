import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TransactionService from "../../service/TransactionService";

function PurchaseTable({purchases}) {
    const transactionService = new TransactionService();
    const userId = localStorage.getItem('userId');
    const myPurchases = purchases.filter(purchase => purchase.seller.id != userId);
    const mySales = purchases.filter(purchase => purchase.seller.id == userId);
    const handleClickConfirm = async (id) => {
        try {
            const transactionResponse = await transactionService.confirmTransaction(id);
            if (transactionResponse.success) {
                alert('Покупка успешно совершена!');
            } else {
                throw new Error(transactionResponse.message);
            }
        } catch (error) {
            console.error('Ошибка при подтверждении:', error);
            alert('Ошибка при подтверждении. Пожалуйста, свяжитесь с поддержкой.');
        }
        window.location.reload();
    };

    const handleClickReject = async (id) => {
        try {
            const transactionResponse = await transactionService.rejectTransaction(id);
            if (transactionResponse.success) {
                alert('Покупка успешно Отменена!');
            } else {
                throw new Error(transactionResponse.message);
            }
        } catch (error) {
            console.error('Ошибка при отмене:', error);
            alert('Ошибка при отмене. Пожалуйста, свяжитесь с поддержкой.');
        }
    };

    return (
        <>
            <h2>Мои покупки</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">PricePerLot</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">BuyerStatus</TableCell>
                            <TableCell align="right">SellerStatus</TableCell>
                            <TableCell align="right">SellerUsername</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myPurchases.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell component="th" scope="row">{purchase.offer.name}</TableCell>
                                <TableCell align="right">{purchase.pricePerLot}</TableCell>
                                <TableCell align="right">{purchase.quantityGoods}</TableCell>
                                <TableCell align="right">{purchase.quantityGoods*purchase.pricePerLot}</TableCell>
                                <TableCell align="right">{purchase.buyerStatus}</TableCell>
                                <TableCell align="right">{purchase.sellerStatus}</TableCell>
                                <TableCell align="right">{purchase.seller.username}</TableCell>
                                <TableCell align="right">
                                {purchase.buyerStatus === 'CANCELED' || purchase.sellerStatus === 'CANCELED' ? (
                                    'Отменена'
                                ) : purchase.buyerStatus === 'CLOSED' && purchase.sellerStatus === 'CLOSED' ? (
                                    'Подтверждена'
                                ) : purchase.sellerStatus === 'WAITING' ? (
                                    'Ожидание продавца'
                                ) : (
                                    <>
                                        <Button onClick={() => handleClickConfirm(purchase.id)} variant="contained" color="success" sx={{ marginRight: 1 }}>Подтвердить</Button>
                                        <Button onClick={() => handleClickReject(purchase.id)} variant="contained" color="error">Отменить</Button>
                                    </>
                                )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2>Мои продажи</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">PricePerLot</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">BuyerStatus</TableCell>
                            <TableCell align="right">SellerStatus</TableCell>
                            <TableCell align="right">BuyerUsername</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mySales.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell component="th" scope="row">{purchase.offer.name}</TableCell>
                                <TableCell align="right">{purchase.pricePerLot}</TableCell>
                                <TableCell align="right">{purchase.quantityGoods}</TableCell>
                                <TableCell align="right">{purchase.quantityGoods*purchase.pricePerLot}</TableCell>
                                <TableCell align="right">{purchase.buyerStatus}</TableCell>
                                <TableCell align="right">{purchase.sellerStatus}</TableCell>
                                <TableCell align="right">{purchase.buyer.username}</TableCell>
                                <TableCell align="right">
                                {purchase.buyerStatus === 'CANCELED' || purchase.sellerStatus === 'CANCELED' ? (
                                    'Отменена'
                                ) : purchase.buyerStatus === 'CLOSED' && purchase.sellerStatus === 'CLOSED' ? (
                                    'Подтверждена'
                                ) : purchase.buyerStatus === 'WAITING' ? (
                                    'Ожидание покупателя'
                                ) : (
                                    <>
                                        <Button onClick={() => handleClickConfirm(purchase.id)} variant="contained" color="success" sx={{ marginRight: 1 }}>Подтвердить</Button>
                                        <Button onClick={() => handleClickReject(purchase.id)} variant="contained" color="error">Отменить</Button>
                                    </>
                                )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default PurchaseTable;